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

	create(data: Partial<User>) {
		const user = Object.assign(new User(), { id: uuid.v4(), ...data });
		console.log('create repository user:', user);
		this.users.push(user);
		return user;
	}

	update(id: string, data: Partial<User>) {
		// const user = this.findOne(id);
		const user = Object.assign(this.findOne(id), data);
		console.log('updated repository user:', user);
		// this.users.push(user);
		return user;
	}

	remove(id: string) {
		const index = this.users.findIndex((item) => item.id === id);
		if (index != -1) {
			const user = this.users.splice(index, 1)[0];
			console.log('deleted user:', user);
			return user;
		}
		return undefined;
	}

}