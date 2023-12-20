const inventoryModel = require("../models/inventoryModel")
const mongoose = require('mongoose')
//Get Blood Data
const bloodGroupDetailsController = async(req,res) => {
    try {
        const bloodGroups = ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
        const bloodGroupData = []
        const organisation = new mongoose.Types.ObjectId(req.body.userId)
        //get single blood group
        //we have to map asynchronously because our data is dynamic
        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            //check out total in and out and then perform calculation
            //count total in
            const totalIn = await inventoryModel.aggregate([
                {$match: {
                    bloodGroup:bloodGroup,
                    inventoryType:'in',
                    organisation
                }},
                {
                    $group:{
                        _id:null, 
                        total:{$sum:'$quantity'}
                    }
                }
            ]);
            //count total out
            const totalOut = await inventoryModel.aggregate([
                {$match: {
                    bloodGroup:bloodGroup,
                    inventoryType:'out',
                    organisation
                }},
                {
                    $group:{
                        _id:null, 
                        total:{$sum:'$quantity'}
                    }
                }
            ]);
            //Calculate total
            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0)
            //Push the data into empty array
            bloodGroupData.push({
                bloodGroup,
                totalIn:totalIn[0]?.total || 0,
                totalOut:totalOut[0]?.total || 0,
                availableBlood
            })
        }))
        return res.status(200).send({
            success:true,
            message:'Blood Group Data Fetched Successfully',
            bloodGroupData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Analytics API',
            error
        });
    }
}
module.exports = {bloodGroupDetailsController}