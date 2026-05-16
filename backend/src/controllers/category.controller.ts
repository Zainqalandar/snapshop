import { Request, Response } from 'express';
const Category = require('../models/category.model');

// CREATE CATEGORY (Admin)
const createCategory = async (req: Request, res: Response) => {
	const { name, slug, parentCategory } = req.body;

	const exists = await Category.findOne({ slug });
	if (exists) {
		return res.status(400).json({ message: 'Category already exists' });
	}

	const category = await Category.create({
		name,
		slug,
		parentCategory: parentCategory || null,
	});

	res.json(category);
};

// GET ALL CATEGORIES
export const getCategories = async (req: Request, res: Response) => {
	const categories = await Category.find().populate('parentCategory');
	res.json(categories);
};

// GET SINGLE CATEGORY
export const getCategory = async (req: Request, res: Response) => {
	const category = await Category.findById(req.params.id);

	if (!category) {
		return res.status(404).json({ message: 'Category not found' });
	}

	res.json(category);
};

// UPDATE CATEGORY
export const updateCategory = async (req: Request, res: Response) => {
	const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.json(category);
};

// DELETE CATEGORY
export const deleteCategory = async (req: Request, res: Response) => {
	await Category.findByIdAndDelete(req.params.id);

	res.json({ message: 'Category deleted' });
};

module.exports = {
	createCategory,
	updateCategory,
	getCategory,
	getCategories,
	deleteCategory,
};
