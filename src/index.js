/*import app from './app'
const router = require('./routers/routes');
app.use('/', router);
app.listen(3000);
console.log('server listening to port:', 3000)*/


import './database'
import {createRoles} from './libs/initialSetup'
var cookieParser = require('cookie-parser')
const express = require('express')
const ejslayouts = require('express-ejs-layouts');
const router = require('./routers/routes')
const tarjetasRouter = require('./routers/tarjetas.routes')
const app = express()
createRoles();
const port = process.env.PORT || 3000


app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use(ejslayouts);
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use('/', router);
app.use(express.static('public'))

//app.use('/',tarjetasRouter);
app.listen(port, () => {
    console.log("servidor activo en el puerto: "+ port)
});