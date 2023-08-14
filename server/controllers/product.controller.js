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

    const product = await productService.getAllProductService(req.user._org._id);
    res.json({ product })

})

const getProduct = catchAsync(async (req, res) => {

    const product = await productService.getProductService(req.params.productId);
    res.json({ product })

})

const updateProduct = catchAsync(async (req, res) => {

    console.log("update");
    const product = await productService.updateProductService(req.params.productId,req.body);

})

module.exports = { createProduct, getAllProduct, getProduct ,updateProduct}