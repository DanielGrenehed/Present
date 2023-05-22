const fs = require('fs');
const http = require('http');
const port = 8001;

http.createServer((req, res) => {
	res.writeHead(200, {'content-type':'text/html'});
	res.end(`<title>Hello world</title><div id="full">hello<div><script>
		var e = document.getElementById("full");
		e.requestFullscreen();
		e.webkitRequestFullscreen();
		e.msRequestFullscreen();
		</script>`);
}).listen(port);

console.log("HTTP server started (port: %i)", port);
