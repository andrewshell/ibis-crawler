- #ibis:Argument
	- Users arriving from outside the system will therefore land "at" a particular element.
	  id:: bdc7ef94-f177-4ca6-bc3e-efcc835edd22
	  collapsed:: true
		- #ibis:specializes
			- ((9231d9b3-d758-4a02-97c5-988870725212))
			- ((ee443eee-74b1-4f93-9c20-f3df54002066))
	- Situating the user "at" a given subject gives a sense of position and orientation in hypermedia space.
	  id:: ee443eee-74b1-4f93-9c20-f3df54002066
	  collapsed:: true
		- #ibis:supports
			- ((2d7e7483-ff54-4b0e-85e4-62bc2aa60914))
		- #ibis:generalizes
			- ((bdc7ef94-f177-4ca6-bc3e-efcc835edd22))
	- Other information systems will be able to link directly to the subject.
	  id:: 9231d9b3-d758-4a02-97c5-988870725212
	  collapsed:: true
		- #ibis:supports
			- ((2d7e7483-ff54-4b0e-85e4-62bc2aa60914))
		- #ibis:generalizes
			- ((bdc7ef94-f177-4ca6-bc3e-efcc835edd22))
	- Krzywinski also has a design called Circos which doesn't have the aspect ratio problem.
	  id:: 15edd16c-b7d7-492b-b8f6-5f35bc4ac2e2
	  collapsed:: true
		- #ibis:suggested-by
			- ((85067158-2473-471d-b4c7-d717c87f0279))
		- #ibis:supports
			- ((b4870889-2df0-4192-930b-4bf08595fdb1))
	- These plots are easy to implement in a few hundred lines of code.
	  id:: d7789282-96d7-4120-b019-a2a43b9da6a6
	  collapsed:: true
		- #ibis:supports
			- ((b4870889-2df0-4192-930b-4bf08595fdb1))
			- ((4ef35d7a-b8a6-4c1e-ad4d-d96ef7a7fa0d))
	- It turns out that hive plots are not good for dynamic data: as the contents change, their aspect ratio changes dramatically, making it impossible to wrangle them into a larger graphic design. Plus they look weird.
	  id:: 85067158-2473-471d-b4c7-d717c87f0279
	  collapsed:: true
		- #ibis:opposes
			- ((4ef35d7a-b8a6-4c1e-ad4d-d96ef7a7fa0d))
		- #ibis:suggests
			- ((15edd16c-b7d7-492b-b8f6-5f35bc4ac2e2))
	- Force-directed graph drawing algorithms are not stable and will not produce identical (geometric) output across runs.
	  id:: e8666f1e-558a-47e3-844f-f328c1d81e25
	  collapsed:: true
		- #ibis:opposes
			- ((3252717c-9af9-46f5-a534-a76a88410d87))
	- Force-directed (i.e. hairball) graphs get pretty hairy pretty quickly.
	  id:: 57754529-268b-451a-8682-fb06ea630a68
	  collapsed:: true
		- #ibis:opposes
			- ((3252717c-9af9-46f5-a534-a76a88410d87))
			- ((4384a028-6eef-47d0-953a-94e624e8a48e))
	- That takes care of the palette problem.
	  id:: 43c0c321-a9f1-4930-b1e7-a2dd02bbb3e7
	  collapsed:: true
		- #ibis:specializes
			- ((9298ed47-75e0-4046-9869-b60c11a9e5e0))
		- #ibis:suggested-by
			- ((d2a19834-d164-46e5-a889-1938dbcbf161))
		- #ibis:supports
			- ((47682812-478a-49ca-aa4f-049302a460fe))
	- Then we're going to have to decide how to transmit the palette to D3.
	  id:: d2a19834-d164-46e5-a889-1938dbcbf161
	  collapsed:: true
		- #ibis:opposes
			- ((4384a028-6eef-47d0-953a-94e624e8a48e))
		- #ibis:suggests
			- ((43c0c321-a9f1-4930-b1e7-a2dd02bbb3e7))
	- Then we're going to have to decide how to feed data to D3.
	  id:: db65c54b-d3ad-42c0-a9c7-eec71898f28d
	  collapsed:: true
		- #ibis:opposes
			- ((4384a028-6eef-47d0-953a-94e624e8a48e))
	- We can pick up the RDFa from CSS or JavaScript and use it to further manipulate the UI.
	  id:: 9298ed47-75e0-4046-9869-b60c11a9e5e0
	  collapsed:: true
		- #ibis:supports
			- ((ec95d1a9-3f88-4e28-96c3-aa6243636478))
		- #ibis:response
			- ((7c61843f-59d2-4896-8466-66214a8e2eff))
		- #ibis:generalizes
			- ((43c0c321-a9f1-4930-b1e7-a2dd02bbb3e7))
	- Writing an IBIS app will provide an opportunity to kick the tires on the vocabulary. The result might actually be useful!
	  id:: 9fcbdf3c-da68-4cac-9826-96440489e0f3
	  collapsed:: true
		- #dct:references
			- https://privatealpha.com/ontology/ibis/1#
		- #ibis:supports
			- ((52dea301-2e68-4c10-ab2d-bb0e0c95aa60))
	- An embedding protocol is a much simpler idea; we can trot the JavaScript in later, when the app is more mature.
	  id:: 554d2a8c-2110-4977-b6d1-0d07f8613540
	  collapsed:: true
		- #dct:references
			- ((fd1478d3-a6ba-430b-bdb2-2d47a4e7caf9))
		- #ibis:specializes
			- ((610b3c51-07bd-4542-a88d-9d95b4d40bb0))
		- #ibis:supports
			- ((7f9a5857-d2c0-4546-81b7-4cb0e8133ad7))
	- JavaScript is certainly dirty, but it isn't clear that it's quick: in particular, the extra fragility of developing client-side and server-side code at the same time.
	  id:: 610b3c51-07bd-4542-a88d-9d95b4d40bb0
	  collapsed:: true
		- #dct:references
			- ((fd1478d3-a6ba-430b-bdb2-2d47a4e7caf9))
		- #ibis:opposes
			- ((18da7df0-32d4-43d6-bbed-9cfa99a6adf3))
		- #ibis:generalizes
			- ((554d2a8c-2110-4977-b6d1-0d07f8613540))
	- Using (e.g.) UUIDs for node identifiers means you can separate the problem of recording information from the problem of naming it.
	  id:: d134ea46-92bc-4471-97d8-468b06920724
	  collapsed:: true
		- #dct:references
			- ((27a05aeb-017c-484d-b490-c6949e6eacbc))
			- ((24eb21b4-59c9-4ac5-85f8-93155e811d1f))
		- #ibis:supports
			- ((6d150850-636c-4ee1-be69-4dc64be920f8))