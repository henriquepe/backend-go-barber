import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface tokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('JWT is missing');
	}

	const [, token] = authHeader.split(' ');

	const { secret } = authConfig.jwt;

	try {
		const decoded = verify(token, secret);
		const { sub } = decoded as tokenPayload;

		request.user = {
			id: sub,
		};

		console.log(decoded);

		return next();
	} catch {
		throw new AppError('Invalid JWT', 401);
	}
}
