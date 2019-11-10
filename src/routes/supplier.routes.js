// import { Router } from 'express';
// import { signup } from '../controllers/user';
const Router = require('express');
const cors = require('cors')
const { listAll, addSupplier, getSupplier } = require('../controllers/supplier');


const router = Router();

router.post('/supplier', cors(), addSupplier);
router.get('/suppliers', cors(), listAll);
router.get('/supplier/:id', cors(), getSupplier);

module.exports = router;
