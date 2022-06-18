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
			throw new NotFoundError('user not found');
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

	getCreateUserDto(body: string) {
		const createUserDto = JSON.parse(body);
		if (!createUserDto.username || !createUserDto.age || !createUserDto.hobbies) {
			// TODO count fields
			throw new ValidationError('request body does not contain required fields');
		}
		return createUserDto;
	}

	getUpdateUserDto(body: string) {
		const updateUserDto = JSON.parse(body);
		if (!updateUserDto.username || !updateUserDto.age || !updateUserDto.hobbies) {
			// TODO count fields
			throw new ValidationError('request body does not contain required fields');
		}
		return updateUserDto;
	}

}