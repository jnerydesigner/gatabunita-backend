import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { injectable, inject } from 'tsyringe';
import {
  startOfHour,
  isBefore,
  getHours,
  format,
  ptBR,
  parseISO,
} from 'date-fns';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

// import usersRouter from '@modules/users/infra/http/routes/users.routes';

interface IRequest {
  date: Date;
  provider_id: string;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationsRepository')
    private notificationRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    console.log(appointmentDate);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't an appointment on a past date.", 401);
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create appointment yourself.", 401);
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You can't create appointment before 8am and after 5pm.",
        401,
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is alread booked', 401);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const { user } = appointment;

    const appointmentDateFormated = format(
      appointmentDate,
      "dd 'de' MMMM 'às' HH:mm'h'",
      {
        locale: ptBR,
      },
    );

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento com ${user.name} para o dia ${appointmentDateFormated}`,
    });

    const cacheKey = `provider-appointments:${provider_id}:${format(
      appointmentDate,
      'YYYY-M-d',
    )}`;

    await this.cacheProvider.invalidate(cacheKey);

    return appointment;
  }
}

export default CreateAppointmentService;
