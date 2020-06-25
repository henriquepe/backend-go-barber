import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

// Rota: Receber a requisição, chamar outro arquivo para resolver e devolver resposta
appointmentsRouter.post('/', (request, response) => {
	try {
		const { provider, date } = request.body;

		const parsedDate = parseISO(date);

		const createAppointment = new CreateAppointmentsService(
			appointmentsRepository,
		);

		const appointment = createAppointment.execute({
			provider,
			date: parsedDate,
		});

		return response.json(appointment);
	} catch (err) {
		return response.status(400).json({ message: `${err.message}` });
	}
});

appointmentsRouter.get('/', (request, response) => {
	const appointments = appointmentsRepository.all();
	return response.json(appointments);
});

export default appointmentsRouter;
