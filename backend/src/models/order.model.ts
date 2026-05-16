const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
	product: mongoose.Schema.Types.ObjectId,
	name: String,
	price: Number,
	quantity: Number,
	image: String,
});

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		items: [orderItemSchema],
		shippingAddress: {
			street: String,
			city: String,
			country: String,
			zipCode: String,
		},
		paymentInfo: {
			method: String,
			status: String,
			transactiondId: String,
		},
		orderStatus: {
			type: String,
			enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
			default: 'pending',
		},
		totalAmount: Number,
		isPaid: {
			type: Boolean,
			default: false,
		},
		paidAt: Date,
		deliveredAt: Date,
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Order", orderSchema);