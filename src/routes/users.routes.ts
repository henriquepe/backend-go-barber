import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

// Rota: Receber a requisição, chamar outro arquivo para resolver e devolver resposta
usersRouter.post('/', async (request, response) => {
	const { name, email, password } = request.body;
	const createUser = new CreateUserService();

	const user = await createUser.execute({ name, email, password });

	delete user.password;

	return response.json(user);
});

usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		const { id } = request.user;
		const { filename } = request.file;
		const updateUserAvatar = new UpdateUserAvatarService();

		const user = await updateUserAvatar.execute({
			user_id: id,
			avatarFilename: filename,
		});

		delete user.password;
		console.log(request.file);
		return response.json(user);
	},
);

export default usersRouter;
