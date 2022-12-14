import { User } from '@prisma/client';
import { IUsersRepository } from '../../repositories';
import { AddUserValidation } from '../../validations';

class DbAddUser {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async execute(
        data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<User> {
        const { email } = data;
        await AddUserValidation(data);
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists !== null) {
            throw new Error('Email already exists.');
        }
        return await this.usersRepository.createUser(data);
    }
}

export { DbAddUser };
