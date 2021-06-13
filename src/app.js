import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import tarjetaRoutes from './routers/tarjetas.routes'
const app = express()
const ejslayout = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.use(ejslayout);
app.use(express)
app.use(express.urlencoded({extended:true}));

app.set('pkg',pkg);
app.use(morgan('dev'));

/*app.get('/',(req,res) => {
res.json({
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
})
});*/


//app.use(tarjetaRoutes);

export default app;