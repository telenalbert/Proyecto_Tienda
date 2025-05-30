const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.post('/',ProductController.insert)

module.exports = router;