import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    // const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
    // let appointments = await this.cacheProvider.recovery<Appointment[]>(
    //   cacheKey,
    // );

    let appointments;

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id,
          year,
          month,
          day,
        },
      );

      // await this.cacheProvider.save(cacheKey, classToClass(appointments));
    }

    return classToClass(appointments);
  }
}

export default ListProviderAppointmentService;
