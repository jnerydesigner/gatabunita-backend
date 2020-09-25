import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRespository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersTokensRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    console.log(user);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      'Pedido de Recuperação de Senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
