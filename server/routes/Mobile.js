const express = require('express');
const router= express.Router();
const MobileController=require('../controller/MobileController');



router.get('/Mobile',MobileController.view);
router.post('/Mobile_recharge',MobileController.Mobile_recharge);
router.get('/Recharge_Summary',MobileController.viewDetails)
module.exports=router;