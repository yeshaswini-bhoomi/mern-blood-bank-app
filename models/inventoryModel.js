//import mongoose
const mongoose = require('mongoose');

//create inventory schema
const inventorySchema = new mongoose.Schema({
    inventoryType:{
        type:String,
        required:[true,'Inventory type required'],
        enum:['in','out']
    },
    bloodGroup:{
        type:String,
        required:[true, 'Blood group is required'],
        enum:['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
    },
    quantity:{
        type:Number,
        required:[true, 'Blood quantity is required']
    },
    email:{
        type: String,
        required:[true, 'Donor Email is required']
    },
    organisation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:[true, 'Organisation is required']
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function(){
            return this.inventoryType === "out"
        }
    },
    donor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function(){
            return this.inventoryType === "in"
        }
    }
},
{timestamps: true}
);

//export
module.exports = mongoose.model('Inventory',inventorySchema);