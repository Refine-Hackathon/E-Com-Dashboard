const express = require('express');



const {
    getAllProperties,
    getAllProducts,
    getProduct
} = require("../controllers/product.controller.js");

const router = express.Router();

router.route("/properties").get(getAllProperties);
router.route("/prdt/:p_name").get(getAllProducts);
router.route("/prdt/:p_name/:id").get(getProduct);
router.route("/properties").post(postProduct);

