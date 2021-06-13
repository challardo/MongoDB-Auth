//---------------------------------- metodos para recuperar contraseña --------------------------------
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

export const forgotPassword = async (req,res) => {
    const {email} = req.body;
    if(!(email)){
        return res.status(400).json({message:'user is required'})
    }
    const message = 'Check your email for a link to reset your password'
    let verificationLink;
    let emailStatus = 'OK'

    const userFound =await User.findOne({email: req.body.email}).populate("roles")
    if(!userFound){
        return res.status(400).json({message: "user Not found"})
       }
     
       const token =jwt.sign({id: userFound._id, email: userFound.email}, config.SECRET, {
        expiresIn: '10m'
    })

    console.log('Usuario encontrado: ' +userFound)

    verificationLink= 'http://localhost:3000/newPassword/'+ token;
    console.log('verification link: ' +verificationLink)
    userFound.resetToken = token;
    //res.setHeader('set-cookie', 'resetToken='+ token);
  
    //TODO: sendEmail
    try {
        //nodemailer para envio de correos
    } catch (error) {
        emailStatus = error;
        return res.status(400).json({message: 'something went wrong'});
    }


    try {
    await User.save(userFound);

} catch (error) {
    emailStatus = error;
    return res.status(400).json({message: 'no se pudo guardar el token del usuario para resetear contraseña'});
}

res.json({message, info:emailStatus});
  console.log('usuario guardado con el token de reseteo' )

}
//Create new PASSWORD-----------------------------------

export const createNewPassword = async (req,res) =>{
    const {newPassword} = req.body;
    const resetToken =   res.setHeader('set-cookie', 'resetToken='+token);
  
    if(!(resetToken && newPassword)){
        res.status(400).json({message: 'All fields are required'})

}
let jwtPayload;
let userFound = User;

 try {
     jwtPayload = jwt.verify(resetToken, config.RESET_SECRET)
     userFound = await User.findOne({resetToken: resetToken})
 } catch (error) {
    res.status(400).json({message: 'Something went wrong'}) 
 }

 userFound.password = newPassword;

 await User.encryptPassword(password)
 await User.save(userFound)

 res.json({message: 'password changed'})
}