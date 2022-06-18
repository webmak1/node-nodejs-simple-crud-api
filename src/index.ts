import 'dotenv/config';
import http from 'http';
import { requestListener } from './app/routes';

const PORT = process.env.PORT || 4000;

const server = http.createServer(requestListener);

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});
