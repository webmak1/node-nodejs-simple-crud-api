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
		this.usersService.validateUserId(id);
		return this.usersService.findOne(id);
	}

	async update(id: string, input: string) {
		this.usersService.validateUserId(id);
		const updateUserDto = this.usersService.getUpdateUserDto(input);
		return this.usersService.update(id, updateUserDto);
	}

	async remove(id: string) {
		this.usersService.validateUserId(id);
		return this.usersService.remove(id);
	}
}
