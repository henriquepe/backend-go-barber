import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/*
 * [x]Recebimento das informações
 * [x]Tratavia de erros e exceções
 * [x]Acesso ao repositório

*/

interface Request {
	provider: string;
	date: Date;
}

export default class CreateAppointmentService {
	private appointmentsRepository: AppointmentsRepository;

	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	}

	public execute({ provider, date }: Request): Appointment {
		const appointmentDate = startOfHour(date);

		const findAppointmentsInSameDate = this.appointmentsRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentsInSameDate) {
			throw Error('This appointment is already booked!');
		}

		const appointment = this.appointmentsRepository.create({
			provider,
			date: appointmentDate,
		});

		return appointment;
	}
}
