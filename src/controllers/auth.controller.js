import User from '../models/userModel'
import Role from '../models/roleModel'
import jwt from 'jsonwebtoken'
import config from '../config'
import { token } from 'morgan'
import cookieParser from 'cookie-parser'
import { transporter } from '../mailer'
const lodash = require('lodash')
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

export const forgotPassword = async (req,res ) => {
    const {email} = req.body;
    if(!(email)){
        return res.status(400).json({message:'user is required'})
    }

    const userFound =await User.findOne({email})
    if(!userFound){
        return res.status(400).json({message: "user Not found"})
       }
     
       const token =jwt.sign({id: userFound._id, email: userFound.email}, config.RESET_SECRET, {
        expiresIn: '10m'
    })

    console.log('Usuario encontrado: ' +userFound)

    var verificationLink= req.protocol +"://"+ req.get('host')+'/resetPassword/'+token;
    console.log('verification link: ' +verificationLink)

  //  console.log('verification token: ' +token)
  
   
   const savedToken = await  userFound.updateOne({resetToken: token}, (err,success) =>{
       if(err){
           return res.status(400).json({error:'reset password link error'})
       }
        // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"Forgot Password 👻" <MiSandbox.correo@gmail.com>', // sender address
    to: userFound.email, // list of receivers
    subject: "Reset password", // Subject line
    text: "Este es el link para resetear tu password", // plain text body
    html: '<b>Haz click aqui:</b>  <a href="'+ verificationLink+'"> Change password </a>', // html body
    
  }, (err, info) => {
    console.log(info.envelope);
    console.log(info.messageId);
});

      // return res.json({success:'email sent'})

   })
   console.log('verification token: ' +token)
    res.redirect('/emailsent')

}


export const createNewPassword = async (req,res) =>{
 const {resetToken, newPass} = req.body;

 if(resetToken){
    jwt.verify(resetToken, config.RESET_SECRET, function(error, decodedToken){
        if(error){
            return res.status(401).json({error: "incorrect link or it has expired"})
        }

    });
    User.findOne({resetToken},async (err,user) => {
        if(err || !user){
            return res.status(400).json({error:'user with this token does not exist'})
        }
        const obj = {
            password: await User.encryptPassword(newPass),
            resetToken: ''
        }
        user = lodash.extend(user, obj);
        user.save((err,result)=>{
            if(err){
                return res.status(400).json({error:'reset password error'})
            }
            else{
                return res.status(200).redirect('/login')
            }
        })
    })
 }
 else{
     return res.status(401).json({error: "error reseting password"})
 }
}


   



