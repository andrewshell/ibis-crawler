const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require('node-fetch');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const cacheDir = path.join(__dirname, './cache');
const pageDir = path.join(__dirname, './graph/pages');

if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
}

if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
}

async function getUrlDocument(url) {
    const cacheName = url.replace(new RegExp('[^a-z]+', 'ig'), '-');
    const cachePath = path.join(cacheDir, `./${cacheName}`);

    let response, contentType, body;

    if (fs.existsSync(cachePath)) {
        console.log(`cached - ${url}`)
        response = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        contentType = response.contentType;
        body = response.body;
    } else {
        console.log(`fetch - ${url}`)
        response = await fetch(url);
        contentType = response.headers.get('content-type');
        body = await response.text();
        fs.writeFileSync(cachePath, JSON.stringify({ contentType, body }), 'utf8');
    }

    const { document } = new JSDOM(body, { url, contentType }).window;
    return document;
}

// 27a05aeb-017c-484d-b490-c6949e6eacbc
function extractUuid(str) {
    const match = str.match(new RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', 'i'));
    if (null != match && uuid.validate(match[0])) {
        return match[0];
    }
    return null;
}

function Set_toJSON(key, value) {
  if (typeof value === 'object' && value instanceof Set) {
    return [...value];
  }
  return value;
}

function addResolvedXmlNs(xmlns, name) {
    const parts = name.split(':', 2);
    if (null == xmlns[parts[0]]) {
        console.log(`Unknown xmlns: ${name}`);
        return;
    }

    xmlns[name] = xmlns[parts[0]] + parts[1];
}

async function crawlIBIS() {
    const urlRoot = 'https://ibis.makethingsmakesense.com/', concepts = {}, xmlns = {};
    let document, elements, element, concept, url, name, parts, value, tuple, tagname;

    document = await getUrlDocument(urlRoot);

    for (let attr of document.documentElement.attributes) {
        if ('xmlns' === attr.prefix) {
            xmlns[attr.localName] = attr.value;
        }
    }

    elements = document.getElementsByTagName('a');
    for (element of elements) {
        const href = element.getAttribute('href').trim('').replace(/^\//, '');
        if (uuid.validate(href)) {
            concepts[href] = { uuid: href, processed: false };
        }
    }

    while (concept = Object.values(concepts).filter(c => c.processed === false).pop()) {
        document = await getUrlDocument(urlRoot + concept.uuid);
        concepts[concept.uuid].typeof = document.body.getAttribute('typeof');
        concepts[concept.uuid].title = document.querySelector('title').textContent.replace('NOW', 'Now');

        if (null == xmlns[concepts[concept.uuid].typeof]) {
            addResolvedXmlNs(xmlns, concepts[concept.uuid].typeof);
        }

        for (tagname of ['button', 'input']) {
            elements = document.getElementsByTagName(tagname);
            for (element of elements) {
                const name = element.getAttribute('name');
                if (null == name) {
                    continue;
                }
                parts = name.split(' ');
                value = extractUuid(element.getAttribute('value') || '');
                if ('-' === parts[0]) {
                    tuple = [concept.uuid, parts[1], value];
                } else if ('-!' === parts[0]) {
                    tuple = [value, parts[1], concept.uuid];
                } else {
                    continue;
                    // console.log('invalid name');
                    // console.log(element.getAttribute('name'));
                    // console.log(element.getAttribute('value'))
                    // process.exit(0);
                }
                if (null == concepts[tuple[0]]) {
                    concepts[tuple[0]] = { uuid: tuple[0], processed: false };
                }
                if (null == concepts[tuple[0]][tuple[1]]) {
                    concepts[tuple[0]][tuple[1]] = new Set();
                }
                if (null == tuple[2]) {
                    tuple[2] = element.getAttribute('value');
                }
                if (null == tuple[2]) {
                    console.log('invalid tuple');
                    console.log(element.getAttribute('name'));
                    console.log(element.getAttribute('value'))
                    process.exit(0);
                }
                concepts[tuple[0]][tuple[1]].add(tuple[2]);

                if (null == xmlns[tuple[1]]) {
                    addResolvedXmlNs(xmlns, tuple[1]);
                }
            }
        }
        concepts[concept.uuid].processed = true;
    }

    return { xmlns, concepts };
}

async function exportLogSeq(data) {
    let filename, contents, element, predicate, resource;
    for (let xmlns of Object.keys(data.xmlns)) {
        filename = './' + xmlns.replace(':', '_') + '.md';
        contents = `title:: ${xmlns}\n`;
        contents += `xmlns:: ${data.xmlns[xmlns]}\n`;
        console.log(filename);
        fs.writeFileSync(path.join(pageDir, filename), contents, 'utf8');
    }

    const types =  Object.values(data.concepts).reduce((types, subject) => {
        if (null == types[subject.typeof]) {
            types[subject.typeof] = [];
        }
        types[subject.typeof].push(subject);
        return types;
    }, {});

    for (let type of Object.keys(types)) {
        filename = './' + type.split(':', 2)[1] + 's.md';
        contents = `- #${type}\n`;
        for (element of types[type]) {
            contents += `\t- ${element.title}\n`;
            contents += `\t  id:: ${element.uuid}\n`;
            contents += `\t  collapsed:: true\n`;
            for (predicate of Object.keys(element)) {
                if (null != data.xmlns[predicate]) {
                    contents += `\t\t- #${predicate}\n`;
                    for (resource of element[predicate]) {
                        if (uuid.validate(resource)) {
                            contents += `\t\t\t- ((${resource}))\n`;
                        } else {
                            contents += `\t\t\t- ${resource}\n`;
                        }
                    }
                }
            }
        }
        console.log(filename);
        fs.writeFileSync(path.join(pageDir, filename), contents, 'utf8');
    }
}

crawlIBIS()
    .then(exportLogSeq)
    .catch(err => console.dir(err));
