import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
// import AppError from '@shared/errors/AppError';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should able to list the the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      user_id: '12345',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: '12345',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: '12345',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: '12345',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: '12345',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: '12345',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: '12345',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: '12345',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: '12345',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: '12345',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentRepository.create({
      user_id: '12345',
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availibility = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availibility).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
