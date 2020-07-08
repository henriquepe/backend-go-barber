import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';

import ensureAuthtenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthtenticated);

// Rota: Receber a requisição, chamar outro arquivo para resolver e devolver resposta
appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body;

	const parsedDate = parseISO(date);

	const createAppointment = new CreateAppointmentsService();

	const appointment = await createAppointment.execute({
		provider_id,
		date: parsedDate,
	});

	return response.json(appointment);
});

appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);

	const appointments = await appointmentsRepository.find();

	return response.json(appointments);
});

export default appointmentsRouter;
