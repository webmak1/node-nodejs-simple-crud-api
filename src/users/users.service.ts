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
		return this.usersRepository.findOne(id);
	}

	update(id: string, input: UpdateUserDto) {
		return this.usersRepository.update(id, input);
	}

	remove(id: string) {
		return this.usersRepository.remove(id);
	}

}