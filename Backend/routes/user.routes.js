const express = require('express');

const { login } = require("../controllers/product.controller.js");
const {register } = require("../controllers/product.controller.js");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);

