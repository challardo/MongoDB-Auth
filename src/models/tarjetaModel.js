import {Schema, model} from 'mongoose'

const tarjetaSchema = new Schema({
   /* name: String,
    category: String,
    price: Number,*/
    titulo: String,
    cabecera: String, 
    celular: String,
    direccion: String,
    correo: String,
    
},
    {
        timeStamps: true,
        versionKey:false
    }
)

export default model('Tarjeta', tarjetaSchema)