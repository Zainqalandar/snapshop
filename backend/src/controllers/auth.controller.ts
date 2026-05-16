import { Request, Response } from 'express';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const sendEmail = require('../utils/sendEmail');

// REGISTER
const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400).json({
			message: 'All fields required',
		});
	}

	if (password.length < 6) {
		res.status(400).json({
			message: 'Password must be 6+ chars',
		});
	}

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		res.status(400).json({
			message: 'Email already exists',
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	const verifyToken = jwt.sign(
		{ id: user._id },
		process.env.JWT_SECRET as string,
		{ expiresIn: '1d' },
	);

	const verifyUrl = `${process.env.CLIENT_URL}/verify/${verifyToken}`;

	console.log('verifyUrl: ', verifyUrl);

	await sendEmail(
		email,
		'Verify your account',
		`<h3>Click to verify:</h3><a href="${verifyUrl}">Verify</a>`,
	);

	res.status(201).json({
		success: true,
		message: 'Registered. Verify email.',
	});
};

// LOGIN
const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'Email & password required' });
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return res.status(400).json({ message: 'Invalid credentials' });
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.status(400).json({ message: 'Invalid credentials' });
	}

	if (!user.isVerified) {
		return res.status(403).json({ message: 'Verify email first' });
	}

	const token = jwt.sign(
		{ id: user._id, role: user.role },
		process.env.JWT_SECRET as string,
		{ expiresIn: process.env.JWT_EXPIRES_IN },
	);

	res.json({
		success: true,
		token,
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		},
	});
};

// VERIFY EMAIL
const verifyEmail = async (req: Request, res: Response) => {
	const { token } = req.params;

	const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
		id: string;
	};

	await User.findByIdAndUpdate(decoded.id, { isVerified: true });

	res.json({ message: 'Email verified' });
};

module.exports = { register, verifyEmail, login };
