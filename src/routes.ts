import http from 'http';
import { UsersController } from './users/users.controller';
import { UsersRepository } from './users/users.repository';
import { UsersService } from './users/users.service';

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

// const getBody = async (req) => {
// 	return new Promise((resolve, reject) => {

// 		const stream = fs.createReadStream(filename, 'utf8');
// 		stream.on('error', (err) => reject(err));
// 		stream.on('data', (chunk) => process.stdout.write(chunk));
// 		stream.on('end', () => resolve());
// 	});
// }

export const requestListener = async function (req, res) {
    res.setHeader("Content-Type", "application/json");
	console.log('Requested:', req.url);
	const parts = req.url.split('/').filter(Boolean);
	console.log(parts);

	const buffers = [] as any;

	for await (const chunk of req) {
		buffers.push(chunk);
	}

	const data = Buffer.concat(buffers).toString();

	// console.log(JSON.parse(data).todo); // 'Buy the milk'
	console.log(data);
	// console.log(JSON.parse(data));

	// let body;

	// try {
	// 	body = data ? JSON.parse(data) : {};
	// } catch (err) {
	// 	console.log(err);
	// 	return;
	// }

	if (parts[0] + '/' + parts[1] === 'api/users' && !parts[3]) {

		let result;
		let statusCode = 200;

		// TODO try-catch - handle errors
		switch (req.method) {
			case 'GET':
				result = await (parts[2] ? usersController.findOne(parts[2]) : usersController.findAll());
				break;
			case 'POST':
				result = await usersController.create(data);
				// res.statusCode = 201;
				statusCode = 201;
				break;
			case 'PUT':
				result = await usersController.update(parts[2], data);
				break;
			case 'DELETE':
				result = await usersController.remove(parts[2]);
				break;
			default:
				// TODO error
				break;
		}

		res.writeHead(statusCode);
		res.end(JSON.stringify(await result));

	} else {
		res.writeHead(404);
		res.end(JSON.stringify({error:"Resource not found"}));
	}

}
