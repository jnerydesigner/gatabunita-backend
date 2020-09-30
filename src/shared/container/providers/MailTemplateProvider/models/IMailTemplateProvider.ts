import IParseTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseEmailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseTemplateDTO): Promise<string>;
}
