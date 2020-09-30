// import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRespository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashprovider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    user_id,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('E-mail already in use', 404);
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('New password is diferent the old password', 404);
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashprovider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('old password is does not match', 404);
      }

      user.password = await this.hashprovider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
