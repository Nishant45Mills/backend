const express = require('express');
const { productController } = require('../controllers');
const verifyToken = require('../middlewares/verifyToekn');
const multer = require('../middlewares/multer');

const router = express.Router();

router.use(verifyToken);

router.route('/').post(multer.array('images', 10), productController.createProduct).get(productController.getAllProduct);
router.route('/images/:productId').patch(multer.single('new_images'),productController.updateImage);
router.route('/:productId').get(productController.getProduct).patch(productController.updateProduct).delete(productController.deleteProduct)

module.exports = router;