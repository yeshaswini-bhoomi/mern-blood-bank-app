// to protect next routes we  create middlewares as this is related to authentication it is called authmiddleware
//next function is called middleware i.e. until this is executed the next things are not executed

//import token
//in login we have encrypted now we are decrypting
const JWT = require("jsonwebtoken");
module.exports = async (req, res, next) => {   //only when next is called the function is executed
    try {
        const token = req.headers["authorization"].split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                  success: false,
                    message:'Authentication Failed',
                });
            } else {
                req.body.userId = decode.userId;
                next();
              }
            });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
          success: false,
          error,
            message:'Authentication Failed'
        });
    }
//this is the authentication middleware function so we can protect our route until the route gets the token and gets successfully verified the code will not get executed and so we receive an error
};
