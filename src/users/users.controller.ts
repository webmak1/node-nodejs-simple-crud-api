import * as uuid from 'uuid';
import { ValidationError } from '../app/errors';
import { UsersService } from './users.service';

export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	async create(input: string) {
		const createUserDto = this.usersService.getCreateUserDto(input);
		return this.usersService.create(createUserDto);
	}

	async findAll() {
		return this.usersService.findAll();
	}

	async findOne(id: string) {
		if (!uuid.validate(id)) {
			throw new ValidationError('userId is invalid');
		}

		return this.usersService.findOne(id);
	}

	async update(id: string, input: string) {
		if (!uuid.validate(id)) {
			throw new ValidationError('userId is invalid');
		}
		const updateUserDto = this.usersService.getUpdateUserDto(input);

		return this.usersService.update(id, updateUserDto);
	}

	async remove(id: string) {
		if (!uuid.validate(id)) {
			throw new ValidationError('userId is invalid');
		}

		return this.usersService.remove(id);
	}
}
