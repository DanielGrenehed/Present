const fs = require('fs');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const ws_port = 8002;
const wss = new WebSocket.Server({port: ws_port});
clients = [];
let images = {"/klimio":fs.readFileSync('./res/klimio.png')
};

let play = [[{text:"LiA på Klimio", x: 0.1, y: 0.2, size: 10, fade:0.01},
{text:"Daniel Grenehed - Iot21", x:0.1, y: 0.27, size: 6, fade:0.007},
{img:"/klimio", x: 0.9, y: 0.07, scale: 1.5, fade: 0.009}],
"clear"];

function isImage(r) {
	if (images.hasOwnProperty(r)) return true;
	return false;
}
function sendImage(r, res) {
	if (!isImage(r)) return;
	res.writeHead(200, {'content-type':'image/gif'});
	res.end(images[r], 'binary');
}

function handleClientMSG(client, msg) {
	console.log(msg);
	if (typeof msg == 'number') {
		client.send(JSON.stringify(play[Math.abs(msg)%play.length]));
	} else client.send(JSON.stringify({text:msg, x: Math.random(), y:Math.random(), size:50}));
}


wss.on('connection', (ws) => {
	clients.push(ws);
	ws.on('message', (msg) => {
		try {handleClientMSG(ws, JSON.parse(msg));
} catch(_e) {}
});
	ws.on('close', () => {
		clients = clients.filter((e) => e !== ws);
	});
}); 

const port = 8001;
const html = fs.readFileSync("index.html", 'utf8');

http.createServer((req, res) => {
	let r = url.parse(req.url, true).pathname;
	console.log(r);
	if (r === "/favicon.ico") {
		res.writeHead(404, {'content-type':'text/html'});
		res.end();
		return;
	}
	else if (isImage(r)) {
		sendImage(r, res);
	} else {
		res.writeHead(200, {'content-type':'text/html'});
		res.end(html);
	}
}).listen(port);

console.log("HTTP server started (port: %i)", port);
console.log("WebSocketServer starsted (port: %i)", ws_port);
