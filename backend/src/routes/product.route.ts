const express = require('express');

const { createProduct, getProducts } = require('../controllers/product.controller')
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();


router.get("/", getProducts);
router.post("/", protect, authorize("customer", "vendor"), createProduct);

module.exports = router