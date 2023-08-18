const { productService } = require("../services");
const catchAsync = require("../util/catchAsync");

const createProduct = catchAsync(async (req, res) => {

    const images = req.files.map((data) => {

        return data.path;
    })

    const productData = await productService.createProductService(req.user._org._id, req.body, images);
    res.json({ productData });

})

const getAllProduct = catchAsync(async (req, res) => {

    const filter = req.query;
    req._org = req.user._org._id;
    const product = await productService.getAllProductService(req.user._org._id);
    res.json({ product })

})

const getProduct = catchAsync(async (req, res) => {

    const product = await productService.getProductService(req.params.productId);
    res.json({ product })

})

const updateProduct = catchAsync(async (req, res) => {

    const product = await productService.updateProductService(req.params.productId, req.body);
    res.json({ product });

})

const deleteProduct = catchAsync(async (req, res) => {

    const product = await productService.getProductService(req.params.productId);
    const deletedProduct = await product.deleteOne();
    res.json({ deleteProduct });

})

const updateImage = catchAsync(async (req, res) => {

    const product = await productService.getProductService(req.params.productId);
    product.images[0] = req.file.path;
    const updatedProduct = await product.save();
    res.json({ updatedProduct })

});

module.exports = { createProduct, getAllProduct, getProduct, updateProduct, deleteProduct, updateImage }