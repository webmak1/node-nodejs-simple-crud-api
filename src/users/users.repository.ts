import * as uuid from 'uuid';
import { User } from './entity/user';

// TODO Generics
export class UsersRepository {
	private readonly users: User[] = [];

	find() {
		return this.users;
	}

	findOne(id: string) {
		return this.users.filter((item) => item.id === id)[0];
	}

	create(input: Partial<User>) {
		const user = Object.assign(new User(), { id: uuid.v4(), ...input });
		this.users.push(user);
		return user;
	}

	update(id: string, input: Partial<User>) {
		const user = Object.assign(this.findOne(id), input);
		return user;
	}

	remove(id: string) {
		const index = this.users.findIndex((item) => item.id === id);
		if (index != -1) {
			const user = this.users.splice(index, 1)[0];
			return user;
		}
		return undefined;
	}
}