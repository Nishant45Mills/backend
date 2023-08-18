const { product } = require("../models");

const createProductService = async (orgId, body, images) => {

    return product.create({ _org: orgId, ...body, images: images });

}

const getAllProductService = async (orgId) => {

    return await product.find({ _org: orgId }).populate('_org', ['comapnyName', 'email']);

}

const getProductService = async (productId) => {

    return await product.findById(productId).populate('_org', ['comapnyName', 'email']);

}

const updateProductService = async (productId, payload) => {

    const productData = await product.findById(productId);
    Object.assign(productData, payload);
    return await productData.save();

}

module.exports = { createProductService, getAllProductService, getProductService, updateProductService }