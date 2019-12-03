// import { Router } from 'express';
// import { signup } from '../controllers/user';
const Router = require('express');
const cors = require('cors');
const {
	signup,
	login,
	getUser,
	listAll,
	deleteProductShoppingCar,
	addProductShoppingCar,
} = require('../controllers/user');

const router = Router();

router.post('/signup', cors(), signup);
router.post('/login', cors(), login);
router.get('/user', cors(), getUser);
router.get('/users', cors(), listAll);
router.put('/shoppingcar/add', cors(), addProductShoppingCar);
router.put('/shoppingcar/delete/:id', cors(), deleteProductShoppingCar);
module.exports = router;
