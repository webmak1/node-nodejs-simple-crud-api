import { NotFoundError, ValidationError } from './errors';
import { UsersController } from '../users/users.controller';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

export const requestListener = async function (req, res) {
    res.setHeader("Content-Type", "application/json");
	// console.log('Requested:', req.url);
	const parts = req.url.split('/').filter(Boolean);
	// console.log(parts);

	const buffers = [] as any;
	for await (const chunk of req) {
		buffers.push(chunk);
	}
	const body = Buffer.concat(buffers).toString();

	// console.log(body);

	if (parts[0] + '/' + parts[1] === 'api/users' && !parts[3]) {

		let result;
		let statusCode = 200;

		try {
			switch (req.method) {
				case 'GET':
					result = await (parts[2] ? usersController.findOne(parts[2]) : usersController.findAll());
					break;
				case 'POST':
					result = await usersController.create(body);
					statusCode = 201;
					break;
				case 'PUT':
					result = await usersController.update(parts[2], body);
					break;
				case 'DELETE':
					result = await usersController.remove(parts[2]);
					break;
				default:
					throw new Error('Unsupported operation');
			}
		} catch (err: any) {
			if (err instanceof ValidationError) {
				statusCode = 400;
			} else if (err instanceof NotFoundError) {
				statusCode = 404;
			} else if (err instanceof Error) {
				statusCode = 500;
			}
			result = { code: statusCode, message: err.message }
		}

		res.writeHead(statusCode);
		res.end(JSON.stringify(await result));

	} else {
		res.writeHead(404);
		res.end(JSON.stringify({error:"Resource not found"}));
	}

}