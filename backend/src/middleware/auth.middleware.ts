import { Request, Response } from 'express';
const jwt = require('jsonwebtoken')

interface AuthRequest extends Request {
	user?: {
		id: string;
		role: string;
	};
}

const authMiddleware = async (req: AuthRequest, res: Response) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			res.status(404).json({
				success: true,
				message: 'No token provided',
			});
		}

        const token = authHeader?.split(' ')[1];

        // const decode = jwt.verify(token, );
	} catch (error: any) {}
};

module.exports = authMiddleware;
