"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
const products = [
    {
        id: (0, uuid_1.v4)(),
        product_name: "PS5",
        product_description: "You can play a lot of games",
        product_price: 10000,
    },
    {
        id: (0, uuid_1.v4)(),
        product_name: "The moon",
        product_description: "It always above us",
        product_price: 100000000000000,
    },
];
productRouter.get("/", (req, res) => {
    res.status(200).json(products);
});
productRouter.post("/", (req, res) => {
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === id);
    if (!product) {
        res.status(404).send("Product not found");
        return;
    }
    res.status(200).json(product);
});
productRouter.put("/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const foundIndex = products.findIndex((product) => product.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Product not found");
        return;
    }
    const updatedProduct = Object.assign(Object.assign({}, products[foundIndex]), { product_name: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[foundIndex].product_name, product_description: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[foundIndex].product_description, product_price: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[foundIndex].product_price });
    products[foundIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
});
productRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const foundIndex = products.findIndex(product => product.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Product not found");
        return;
    }
    products.splice(foundIndex, 1);
    res.status(200).send("Product was deleted!");
});
exports.default = productRouter;
