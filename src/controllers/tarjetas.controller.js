import Tarjeta from '../models/tarjetaModel'
const multer = require('multer');

export const createTarjeta = async (req,res) => {
console.log(req.body);

const {titulo,cabecera,celular,direccion,correo,tarjetaImage} = req.body

const newTarjeta = new Tarjeta({titulo,cabecera,celular,direccion,correo,tarjetaImage:req.file.path})

const TarjetaSaved = await newTarjeta.save()
    res.status(201).redirect('/dashboard');

}

export const getTarjetas = async (req,res) => {
const tarjetas = await Tarjeta.find()
//res.json(tarjetas)

res.render('pages/home', {layout: 'layout', tarjetas: tarjetas})
}

export const getTarjetasAdmin = async (req,res) => {
    const tarjetas = await Tarjeta.find()
    //res.json(tarjetas)
    res.render('pages/dashboard', {layout: 'layout', tarjetas,tarjetas: tarjetas})
    }

export const getTarjetaById = async (req,res) => {
const tarjeta = await Tarjeta.findById(req.params.tarjetaId);

res.render('pages/updateTarjeta', {layout: 'layout', tarjetas,tarjeta})
}

export const updateTarjetaById = async (req,res) => {
    try {
        
        const {titulo,cabecera,celular,direccion,correo,tarjetaImage} = req.body
        const newTarjeta ={titulo,cabecera,celular,direccion,correo,tarjetaImage:req.file.path}
        const tarjeta = await Tarjeta.findByIdAndUpdate(req.params.tarjetaId, newTarjeta, {
            new:true
        })  
        console.log(tarjeta)
        res.status(201).redirect('/dashboard'), {layout: 'layout'};
    } catch (error) {
        console.log(error)
    }

}

export const deleteTarjetaById = async (req,res) => {

}