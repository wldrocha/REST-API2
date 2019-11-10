const Router = require('express');
const cors = require('cors')
const { addProduct, getProduct, listAll } = require('../controllers/product');


const router = Router();

router.post('/product', cors(), addProduct);
router.get('/products', cors(), listAll);
router.get('/product/:id', cors(), getProduct)
module.exports =router;
