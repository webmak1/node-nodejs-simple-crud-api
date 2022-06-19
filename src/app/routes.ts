import { IncomingMessage, ServerResponse } from 'http';
import { NotFoundError, ValidationError } from './errors';
import { UsersController } from '../users/users.controller';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { ERR_RESOURCE_NOT_FOUND, ERR_UNSUPPORTED_OPERATION } from './constants';

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

export const routes = async function (req: IncomingMessage, res: ServerResponse) {
	console.log(`Worker ${process.pid} requested`);
	res.setHeader("Content-Type", "application/json");
	const parts = req.url.split('/').filter(Boolean);

	const buffers = [] as any;
	for await (const chunk of req) {
		buffers.push(chunk);
	}
	const body = Buffer.concat(buffers).toString();

	if (`${parts[0]}/${parts[1]}` === 'api/users' && !parts[3]) {

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
					statusCode = 204;
					break;
				default:
					throw new Error(ERR_UNSUPPORTED_OPERATION);
			}
		} catch (err: any) {
			if (err instanceof ValidationError) {
				statusCode = 400;
			} else if (err instanceof NotFoundError) {
				statusCode = 404;
			} else if (err instanceof Error) {
				statusCode = 500;
			}
			result = { code: statusCode, message: err.message };
		}

		res.writeHead(statusCode);
		res.end(JSON.stringify(result));

	} else {
		res.writeHead(404);
		res.end(JSON.stringify({ code: 404, message: ERR_RESOURCE_NOT_FOUND }));
	}
}
