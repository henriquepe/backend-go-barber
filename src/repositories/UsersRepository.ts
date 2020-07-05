import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
	public async findByDate(email: string): Promise<User | null> {
		const findEmail = await this.findOne({
			where: { email },
		});

		return findEmail || null;
	}
}
