import * as uuid from 'uuid';
import { NotFoundError, ValidationError } from '../app/errors';
import { UsersService } from './users.service';

export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	async create(body: string) {
		console.log('controller, create, got body:', body);
		const createUserDto = JSON.parse(body);
		return this.usersService.create(createUserDto);
	}

	async findAll() {
		return this.usersService.findAll();
	}

	async findOne(id: string) {
		if (!uuid.validate(id)) {
			throw new ValidationError('userId is invalid');
		}
		console.log('controller, findOne, got id:', id);
		const result = this.usersService.findOne(id);
		console.log('contoller findOne result:', result);
		if (!result) {
			throw new NotFoundError('user not found');
		}
		return result;
	}

	async update(id: string, body: string) {
		console.log('controller, update, got id:', id, 'body:', body);
		const updateUserDto = JSON.parse(body);
		return this.usersService.update(id, updateUserDto);
	}

	async remove(id: string) {
		console.log('controller, remove, got id:', id);
		return this.usersService.remove(id);
	}
}
