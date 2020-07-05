import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

// Rota: Receber a requisição, chamar outro arquivo para resolver e devolver resposta
usersRouter.post('/', async (request, response) => {
	try {
		const { name, email, password } = request.body;
		const createUser = new CreateUserService();

		const user = await createUser.execute({ name, email, password });

		delete user.password;

		return response.json(user);
	} catch (err) {
		return response.status(400).json({ message: `${err.message}` });
	}
});

usersRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
	return response.json({ ok: true });
});

export default usersRouter;
