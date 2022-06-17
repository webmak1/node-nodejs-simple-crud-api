import 'dotenv/config';
import http from 'http';
import { requestListener } from './routes';

const PORT = process.env.PORT || 4000;

// Create a local server to receive data from
// const server = http.createServer((req, res) => {
// 	res.writeHead(200, { 'Content-Type': 'application/json' });
// 	res.end(JSON.stringify({
// 		data: 'Hello World!'
// 	}));
// });

const server = http.createServer(requestListener);

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});
