import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import { getMongoRepository, MongoRepository } from 'typeorm';

class NotificationsRepository implements INotificationsRepository {
  private notificationRepository: MongoRepository<Notification>;

  constructor() {
    this.notificationRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.notificationRepository.create({
      content,
      recipient_id,
    });

    await this.notificationRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
