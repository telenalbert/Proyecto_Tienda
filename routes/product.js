const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.post('/',ProductController.insert)
router.get('/',ProductController.getAll)
router.get('/id/:id', ProductController.getById)
router.get('/nameProduct/:nameProduct', ProductController.getOneByName)
router.delete('/id/:id', ProductController.delete)
router.put('/id/:id', ProductController.update)

module.exports = router;