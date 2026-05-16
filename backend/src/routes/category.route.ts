import express from 'express';

const {
	createCategory,
	updateCategory,
	getCategory,
	getCategories,
	deleteCategory,
} = require('../controllers/category.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Public
router.get('/', getCategories);
router.get('/:id', getCategory);

// Admin only
router.post('/', protect, authorize('customer'), createCategory);
router.put('/:id', protect, authorize('customer'), updateCategory);
router.delete('/:id', protect, authorize('customer'), deleteCategory);

module.exports = router;
