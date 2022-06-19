import * as uuid from 'uuid';
import { User } from './entity/user';

// TODO Generics
export class UsersRepository {
	private readonly users: User[] = [];

	async find(): Promise<User[]> {
		return new Promise((resolve, reject) => {
			resolve(this.users);
		});
	}

	async findOne(id: string): Promise<User> {
		return new Promise((resolve, reject) => {
			resolve(this.users.filter((item) => item.id === id)[0]);
		});
	}

	async create(input: Partial<User>): Promise<User> {
		return new Promise((resolve, reject) => {
			const user = Object.assign(new User(), { id: uuid.v4(), ...input });
			this.users.push(user);
			resolve(user);
		});
	}

	async update(id: string, input: Partial<User>): Promise<User> {
		return new Promise(async (resolve, reject) => {
			const user = Object.assign(await this.findOne(id), input);
			resolve(user);
		});
	}

	async remove(id: string): Promise<User> {
		return new Promise((resolve, reject) => {
			const index = this.users.findIndex((item) => item.id === id);
			if (index != -1) {
				const user = this.users.splice(index, 1)[0];
				resolve(user);
			}

			resolve(undefined);
		});
	}
}