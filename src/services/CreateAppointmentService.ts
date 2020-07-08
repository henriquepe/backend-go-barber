import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';
/*
 * [x]Recebimento das informações
 * [x]Tratavia de erros e exceções
 * [x]Acesso ao repositório

*/

interface Request {
	provider_id: string;
	date: Date;
}

export default class CreateAppointmentService {
	public async execute({ provider_id, date }: Request): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);

		const appointmentDate = startOfHour(date);

		const findAppointmentsInSameDate = await appointmentsRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentsInSameDate) {
			throw new AppError('This appointment is already booked!', 401);
		}

		const appointment = appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});

		await appointmentsRepository.save(appointment);

		return appointment;
	}
}
