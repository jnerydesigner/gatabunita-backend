import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakesNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/fakes/FakesNotificationsRepository';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakesNotificationsRepository: FakesNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakesNotificationsRepository = new FakesNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakesNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user_id',
      provider_id: 'provider_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await createAppointment.execute({
      date: new Date(2020, 4, 10, 12),
      user_id: 'user_id',
      provider_id: 'provider_id',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 12),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: 'user_id',
        provider_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
