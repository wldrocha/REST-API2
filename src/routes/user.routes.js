// import { Router } from 'express';
// import { signup } from '../controllers/user';
const Router = require('express');
const cors = require('cors')
const { signup, login, getUSer } = require('../controllers/user');


const router = Router();

router.post('/signup', cors(), signup);
router.post('/login', cors(), login);
router.get('/user', cors(), getUSer)
module.exports =router;
