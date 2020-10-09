import { injectable, inject } from 'tsyringe';
// import { getDate, getDaysInMonth } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
}

@injectable()
class ListAllAppointmentProviderService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ provider_id }: IRequest): Promise<Appointment[]> {
    await this.cacheProvider.revovery('agendamentos');

    const appointments = await this.appointmentsRepository.findAllRepository({
      provider_id,
    });

    await this.cacheProvider.save('agendamentos', [appointments]);

    return appointments;
  }
}

export default ListAllAppointmentProviderService;
