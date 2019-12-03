const Router = require('express');
const cors = require('cors')
const { addPayment, editPayment,listAll } = require('../controllers/payment');


const router = Router();

router.post('/payment', cors(), addPayment);
router.put('/payment/:id', cors(), editPayment);
router.get('/payments', cors(), listAll);
module.exports =router;
