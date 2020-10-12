import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointment from '@modules/appointments/services/ListProviderAppointmentService';
import ListAllAppointmentProvider from '@modules/appointments/services/ListAllAppointmentProviderService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const { day, month, year } = request.body;

    const listProviderAppointment = container.resolve(ListProviderAppointment);

    const appointments = await listProviderAppointment.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}
