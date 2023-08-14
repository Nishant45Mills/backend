const { product } = require("../models");

const createProductService = async (orgId, body, images) => {

    return product.create({ _org: orgId, ...body, images: images });

}

const getAllProductService = async (orgId) => {

    return await product.find({ _org: orgId }).populate('_org', ['comapnyName', 'email']);

}

const getProductService = async (productId) => {

    return await product.find({ _id: productId }).populate('_org', ['comapnyName', 'email']);

}

const updateProductService = async (productId, payload) => {

    console.log("update2");
    const product = await product.find({ _id: productId });
    console.log("update3");
    console.log(product);

}

module.exports = { createProductService, getAllProductService, getProductService, updateProductService }