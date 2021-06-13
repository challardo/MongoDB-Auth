import User from '../models/userModel'
import Role from '../models/roleModel'
import jwt from 'jsonwebtoken'
import config from '../config'
import { token } from 'morgan'
import cookieParser from 'cookie-parser'

export const register = async (req,res) => {

    res.render('pages/register')
}

export const login = async (req,res) => {
   
    res.render('pages/login')
}

export const postRegister = async (req,res) => {


    const {username, email, password,roles} = req.body;

    const userFound =User.find({email})
    const newUser =new User({
        username,
        email,
        password: await User.encryptPassword(password),

    })
   //console.log('token: '+token);
//busca los roles dentro de la bd y si es nuevo usuario se le asigna el rol de usuario basico
if(roles){
    const foundRoles= await Role.find({name:{$in: roles}})
    newUser.roles = foundRoles.map(role => role._id)
 }
 else{
     const role = await Role.findOne({name:"user"})
     newUser.roles = [role._id]; 
 }

    const savedUser = await newUser.save();
    const token =jwt.sign({id: savedUser}, config.SECRET, {
    expiresIn: 86400 //24 HORAS
})
console.log('saved user:' + savedUser)
res.setHeader('set-cookie', 'token='+token);
 res.render('pages/login')
}

export const postLogin = async (req,res) => {
   const userFound =await User.findOne({email: req.body.email}).populate("roles")

   if(!userFound){
    return res.status(400).json({message: "user Not found"})
   }

   const matchPassword =await User.comparePassword(req.body.password, userFound.password)
   if(!matchPassword){
       return res.status(401).json({token: null, message: 'Invalid password'})
   }

   const token =jwt.sign({id: userFound._id}, config.SECRET, {
       expiresIn: 86400
   })
   console.log('user found: ' +userFound + '    user token:' + token)
   res.setHeader('set-cookie', 'token='+token);
   //res.cookie('newUser',false);
    res.redirect('/dashboard')
}

export const cookieTest = async (req,res) =>{
const token = 'dfasdfasdfasdfasdfbrr'
    res.setHeader('set-cookie', 'token='+token);
    console.log(req.cookies.token)
    
    res.send('you got the cookies!');
}

export const logout_get = async (req,res) => {
    res.cookie('token', '', {maxAge:1});
    res.redirect('/');
}


