const fs = require('fs');
const http = require('http');
const port = 8001;

http.createServer((req, res) => {
	res.writeHead(200, {'content-type':'text/html'});
	res.end(`<title>Hello world</title><div id="full">hello<div>
		<button id="fullsc" onclick="fullscreen()">Fullscreen</button>
	<script>
		function fullscreen() {
			let e = document.getElementById("full");	
			console.log(e.requestFullscreen());
		}
	</script>`);
}).listen(port);

console.log("HTTP server started (port: %i)", port);
