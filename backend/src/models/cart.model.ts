const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
	},
	quantity: {
		type: Number,
		default: 1,
	},
	price: Number,
});

const cartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			unique: true,
		},
		items: [cartItemSchema],
		totalPrice: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Cart', cartSchema);
