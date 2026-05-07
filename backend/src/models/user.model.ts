const mongoose = require('mongoose');

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
            match: [/^\S+@\S+\.\S+$/, 'Invalid email']
		},
		password: {
			type: String,
			required: true,
            minlength: 6,
            select: false
		},
		role: {
			type: String,
			required: true,
            enum: ['customer', 'admin'],
            default: 'customer'
		},
        isVerified: {
            type: Boolean,
            required: true,
            default: false
        }
	},
	{ timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
