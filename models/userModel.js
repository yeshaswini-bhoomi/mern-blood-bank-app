//import mongoose because with the help of mongoose we can create a schema nosql database -mongodb so with the help of this the documents inside the collection are created with mongoose
const mongoose = require('mongoose')

//create a schema
const userSchema = new mongoose.Schema({
    //role is also to be added whether it is a user, org, hospital, admin
    role:{
        type:String,
        required:[true,'Role is required'],
        enum:['admin', 'organisation', 'donor', 'hospital']
    },
    name:{
        type:String,
        required:function(){    //function is indicated conditionally when the name field is required
            if(this.role === 'user' || this.role === 'admin'){
                return true;
            }
            return false;
        }
    },
    organisationName:{
        type:String,
        required:function(){    //function is indicated conditionally when the name field is required
            if(this.role === 'organisation'){
                return true;
            }
            return false;
        }
    },
    hospitalName:{
        type:String,
        required:function(){    //function is indicated conditionally when the name field is required
            if(this.role === 'hospital'){
                return true;
            }
            return false;
        }
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,              //with one email id only one user can register
    },
    password:{        //encrypt the password so that no one can access in case of data breach the hash password cannot be decrypted without the original password so the application's securitywill be reserved
        type:String,
        required:[true,'Password is required'],    //min length validation can be applied
    },
    website:{
        type:String,//as required is not present it depends on the user whether he wants to enter it or no
    },
    address:{
        type:String,
        required:[true,'Address is required'],
    },
    phone:{
        type:String,
        required:[true,'Phone number is required'],
    },
}, {timestamps:true});

//export
module.exports=mongoose.model("users", userSchema);

//this is stored in the mongodb for every user that enters his details
//with the help of this we can create route functions and controller functions