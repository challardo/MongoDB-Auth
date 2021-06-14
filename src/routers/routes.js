/* jshint esversion: 6 */
const express = require('express');
const path = require('path');
import Tarjeta from '../models/tarjetaModel'
import * as tarjetaController from '../controllers/tarjetas.controller'
import * as authController from '../controllers/auth.controller'
import {authJwt} from '../middlewares'
import userModel from '../models/userModel';


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb){
        cb(null, 'testImage' + file.originalname)
    }
});
const fileFilter = (req, file,cb) =>{
    //reject file 
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
  
    //accept file

    
};
//const upload = multer({dest: 'uploads/'})
const upload = multer({storage: storage, limits:{fileSize: 1024*1024*5}, fileFilter: fileFilter})

const router = express.Router();
module.exports = router;
//----------- autenticacion --------------
router.get('*', authJwt.checkUser);

router.get('/login', authController.login)
router.post('/login', authController.postLogin)
router.get('/register', authController.register)
router.post('/register', authController.postRegister)

//----------- Rutas de tarjetas --------------


router.get('/', tarjetaController.getTarjetas)

router.get('/dashboard',[authJwt.verifyToken, authJwt.isAdmin ], tarjetaController.getTarjetasAdmin)
router.post('/dashboard',[authJwt.verifyToken, authJwt.isAdmin, upload.single('tarjetaImage') ], tarjetaController.createTarjeta)

router.get('/createTarjeta',[authJwt.verifyToken, authJwt.isAdmin ], (req, res) =>{
    res.render('pages/createTarjeta');
    });

router.get('/edit/:tarjetaId',[authJwt.verifyToken, authJwt.isAdmin ], async (req,res) => {
    const tarjeta = await Tarjeta.findById(req.params.tarjetaId);   
    res.render('pages/updateTarjeta', {tarjeta})
    });

router.post('/edit/:tarjetaId',[authJwt.verifyToken, authJwt.isAdmin,upload.single('tarjetaImage') ], tarjetaController.updateTarjetaById);

router.get('/delete/:tarjetaId',[authJwt.verifyToken, authJwt.isAdmin ], async (req,res) =>{
    const tarjeta = await Tarjeta.findByIdAndRemove(req.params.tarjetaId);
    res.redirect('/dashboard')
    });

router.get('/set-cookies', authController.cookieTest)
router.get('/logout', authController.logout_get);



router.get('/forgotPassword', (req,res) => {
    res.render('pages/forgotPassword')
})
router.get('/resetPassword/:resetToken', async (req,res) => {
  //  console.log("token id" +req.params.resetToken)
    const resetToken = await userModel.findOne({resetToken:req.params.resetToken});   
    res.render('pages/resetPassword', {resetToken})
    });



router.post('/forgotPassword', authController.forgotPassword)
router.put('/forgotPassword', authController.forgotPassword)
router.put('/resetPassword', authController.createNewPassword)
router.get('/emailsent', (req,res) => {
    res.render('pages/emailsent')
})
router.post('/resetPassword', authController.createNewPassword)


//router.post('/resetPassword', authController.createNewPassword)

//router.post('/changePassword', authController.changePassword)



