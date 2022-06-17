import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	create(data: CreateUserDto) {
		return this.usersRepository.create(data);
	}

	findAll() {
		return this.usersRepository.find();
	}

	findOne(id: string) {
		return this.usersRepository.findOne(id);
	}

	update(id: string, data: UpdateUserDto) {
		return this.usersRepository.update(id, data);
	}

	remove(id: string) {
		return this.usersRepository.remove(id);
	}

}