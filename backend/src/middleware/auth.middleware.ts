import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

interface AuthRequest extends Request {
	user?: {
		id: string;
		role: string;
	};
}

const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			res.status(404).json({
				success: true,
				message: 'No token provided',
			});
		}

		const token = authHeader?.split(' ')[1];

		try {
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET as string,
			) as {
				id: string;
				role: string;
			};

			req.user = { id: decoded.id, role: decoded.role };
			next();
		} catch (error) {
			return res.status(401).json({ message: 'Invalid token' });
		}
	} catch (error: any) {}
};

const authorize = (...allowedRoles: string[]) => {
	return (req: AuthRequest, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		if (!allowedRoles.includes(req.user.role)) {
			return res.status(403).json({ message: 'Forbidden' });
		}
		next();
	};
};

module.exports = { protect, authorize };
