import { Router } from "express";
import { getCustomRepository } from 'typeorm';
import { parseISO } from "date-fns";
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthentidated from '../middlewares/ensureAuthenticated';


const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthentidated);

appointmentsRouter.get('/', async (request, response) => {


  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentRepository.find();


  return response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {

  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({ date: parseDate, provider_id });

  return response.json(appointment);
});

export default appointmentsRouter;
