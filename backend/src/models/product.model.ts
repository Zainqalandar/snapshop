const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
	size: String,
	color: String,
	stock: Number,
});

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			index: true,
		},
		description: String,
		price: {
			type: Number,
			required: true,
		},
		discountPrice: Number,

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		brand: String,
		stock: {
			type: Number,
			required: true,
		},
		images: [String],
		seller: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		ratings: {
			average: {
				type: Number,
				default: 0,
			},
			count: {
				type: Number,
				default: 0,
			},
		},
		variants: [variantSchema],
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Product", productSchema);