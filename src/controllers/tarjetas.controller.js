import Tarjeta from '../models/tarjetaModel'

export const createTarjeta = async (req,res) => {
console.log(req.body);

const {titulo,cabecera,celular,direccion,correo} = req.body
const newTarjeta = new Tarjeta({titulo,cabecera,celular,direccion,correo})

const TarjetaSaved = await newTarjeta.save()
    res.status(201).redirect('/dashboard');

}

export const getTarjetas = async (req,res) => {
const tarjetas = await Tarjeta.find()
//res.json(tarjetas)

res.render('pages/home', {tarjetas: tarjetas})
}

export const getTarjetasAdmin = async (req,res) => {
    const tarjetas = await Tarjeta.find()
    //res.json(tarjetas)
    res.render('pages/dashboard', {tarjetas: tarjetas})
    }

export const getTarjetaById = async (req,res) => {
const tarjeta = await Tarjeta.findById(req.params.tarjetaId);

res.render('pages/updateTarjeta', {tarjeta})
}

export const updateTarjetaById = async (req,res) => {
    try {
        const tarjeta = await Tarjeta.findByIdAndUpdate(req.params.tarjetaId, req.body, {
            new:true
        })  
        console.log(tarjeta)
        res.render('pages/updateTarjeta', {tarjeta})
    } catch (error) {
        console.log(error)
    }

}

export const deleteTarjetaById = async (req,res) => {

}