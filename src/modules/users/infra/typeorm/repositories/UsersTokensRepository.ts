import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUsersTokensRepository from '@modules/users/repositories/IUserTokenRepository';
import { getRepository, Repository } from 'typeorm';

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = await this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokensRepository;
