import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IReset {
  token: string;
  password: string;
}
export default class FakeResetPasswordProvider implements IMailProvider {
  private reset: IReset[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}
