const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
	street: String,
	city: String,
	country: String,
	zipCode: String,
});

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
			index: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			select: false,
		},
		role: {
			type: String,
			required: true,
			enum: ['customer', 'admin', 'vendor'],
			default: 'customer',
		},
		avatar: String,
		adress: [addressSchema],
		isVerified: {
			type: Boolean,
			required: true,
			default: false,
		},
		refreshToken: String,
	},
	{ timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
