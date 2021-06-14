import jwt from "jsonwebtoken"
import config from '../config'
import roleModel from "../models/roleModel";
import User from '../models/userModel'

export const verifyToken = async (req,res, next) => {
    const cookies = req.cookies;
   const token = cookies.token;

   //console.log(req.cookies.token)

   if(!token) return res.render('pages/login')

   const decoded =jwt.verify(token, config.SECRET)
   req.userId = decoded.id;
    const user =await User.findById(req.userId, {password: 0})
    if(!user) return res.render('pages/login')
   next()
}

export const checkUser = (req,res, next) =>{
    
    const token = req.cookies.token;
   // const decoded =jwt.verify(token, config.SECRET)
   //req.userId = decoded.id;
   //const UserId = req.userId
    if(token){
        jwt.verify(token, config.SECRET,async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user= null;
                next();
            }
            else{
               // console.log(UserId)
                let user = await User.findById(decodedToken.id)
              //  console.log(user)
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.locals.user= null;
        next();
    }
}

export const isModerator = async(req,res,next) =>{
const user =await User.findById(req.userId)
const roles =await roleModel.find({_id: {$in: user.roles}})
//console.log(roles)
for(let i=0; i<roles.length; i++){
    if(roles[i].name === "moderator"){
        next();
        return;
    }
   
}
console.log('require moderator role')
return res.redirect('/')
}

export const isAdmin = async(req,res,next) => {
    const user =await User.findById(req.userId)
    const roles =await roleModel.find({_id: {$in: user.roles}})
  //  console.log(roles)
    for(let i=0; i<roles.length; i++){
        if(roles[i].name === "admin"){
            next();
            return;
        }
       
    }
    console.log('require admin role')
    return res.redirect('/')
}