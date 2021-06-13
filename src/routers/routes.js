/* jshint esversion: 6 */
const express = require('express');
const path = require('path');
import Tarjeta from '../models/tarjetaModel'
import * as tarjetaController from '../controllers/tarjetas.controller'
import * as authController from '../controllers/auth.controller'
import {authJwt} from '../middlewares'

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
router.post('/dashboard',[authJwt.verifyToken, authJwt.isAdmin ], tarjetaController.createTarjeta)

router.get('/createTarjeta',[authJwt.verifyToken, authJwt.isAdmin ], (req, res) =>{
    res.render('pages/createTarjeta');
    });

router.get('/edit/:tarjetaId',[authJwt.verifyToken, authJwt.isAdmin ], async (req,res) => {
    const tarjeta = await Tarjeta.findById(req.params.tarjetaId);   
    res.render('pages/updateTarjeta', {tarjeta})
    });

router.post('/edit/:tarjetaId',[authJwt.verifyToken, authJwt.isAdmin ], async (req,res) => {
    try {   
        const tarjeta = await Tarjeta.findByIdAndUpdate(req.params.tarjetaId, req.body, {
        new:true
    })   
        res.redirect('/dashboard')
        } catch (error) {
        console.log(error)
    }
    });

router.get('/delete/:tarjetaId',[authJwt.verifyToken, authJwt.isAdmin ], async (req,res) =>{
    const tarjeta = await Tarjeta.findByIdAndRemove(req.params.tarjetaId);
    res.redirect('/dashboard')
    });

router.get('/set-cookies', authController.cookieTest)
router.get('/logout', authController.logout_get);


