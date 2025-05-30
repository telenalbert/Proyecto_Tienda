const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.post('/',ProductController.insert)
router.get('/',ProductController.getAll)
router.get('/id/:id', ProductController.getById)
router.get('/nameProduct/:nameProduct', ProductController.getOneByName)

module.exports = router;