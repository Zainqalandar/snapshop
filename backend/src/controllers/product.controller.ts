import { Request, Response } from 'express';
const Product = require('../models/product.model');

const createProduct = async (req: any, res: Response) => {
	const product = await Product.create({
		...req.body,
		seller: req.user.id,
	});

	res.json(product);
};

const getProducts = async (req: Request, res: Response) => {
	const products = await Product.find().populate('Category');

	res.json(products);
};

module.exports = { createProduct, getProducts };
