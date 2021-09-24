const express = require('express');
const router= express.Router();
const UserController=require('../controller/UserController');

/*router.get('/', (req, res) => {
    res.render('home')

});*/
router.get('/',UserController.view);
router.post('/Add_user',UserController.createUsers);
router.post('/login',UserController.userLogin);
router.delete('/logout',UserController.userLogout);
module.exports=router;
