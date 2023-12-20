const userModel  = require('../models/userModel')

module.exports = async(req,res,next) => {
    try {
        const user = await userModel.findById(req.body.userId)
        //Check Admin
        if(user?.role !== 'admin'){
            return res.status(401).send({
                success:false,
                message:'Authorization Failed'
            })
        }
        else{
            next(); //further execution takes place
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send({   //401-unauthorized
            success:false,
            message: 'Authorization Failed, Admin API',
            error
        }) 

    }
}