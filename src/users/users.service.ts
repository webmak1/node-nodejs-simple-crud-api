import * as uuid from 'uuid';
import { ERR_BODY_INVALID_FORMAT, ERR_BODY_VALIDATION, ERR_USERID_INVALID, ERR_USER_NOT_FOUND } from '../app/constants';
import { NotFoundError, ValidationError } from '../app/errors';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	create(input: CreateUserDto) {
		return this.usersRepository.create(input);
	}

	findAll() {
		return this.usersRepository.find();
	}

	findOne(id: string) {
		const user = this.usersRepository.findOne(id);
		if (!user) {
			throw new NotFoundError(ERR_USER_NOT_FOUND);
		}

		return user;
	}

	update(id: string, input: UpdateUserDto) {
		const user = this.findOne(id);
		return this.usersRepository.update(id, input);
	}

	remove(id: string) {
		const user = this.findOne(id);
		return this.usersRepository.remove(id);
	}

	getCreateUserDto(input: string) {
		let createUserDto: CreateUserDto;
		try {
			createUserDto = JSON.parse(input);
		} catch (err) {
			throw new ValidationError(ERR_BODY_INVALID_FORMAT);
		}

		if (typeof createUserDto.username !== 'string' ||
			typeof createUserDto.age !== 'number' ||
			!Array.isArray(createUserDto.hobbies) ||
			createUserDto.hobbies.some((item) => typeof item !== 'string')) {
			// TODO count fields
			throw new ValidationError(ERR_BODY_VALIDATION);
		}

		createUserDto.username = createUserDto.username.trim();
		createUserDto.hobbies.map((item) => item.trim());

		if (!createUserDto.username) {
			// TODO count fields
			throw new ValidationError(ERR_BODY_VALIDATION);
		}

		return createUserDto;
	}

	getUpdateUserDto(input: string) {
		return Object.assign(new UpdateUserDto(), this.getCreateUserDto(input));
	}

	validateUserId(id: string) {
		if (!uuid.validate(id)) {
			throw new ValidationError(ERR_USERID_INVALID);
		}
	}
}