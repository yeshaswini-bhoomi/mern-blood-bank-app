const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel")
//create inventory controller using a call back function and recieve the data asynchronously
const createInventoryController = async(req, res) => {
    try {
        //destructure email from body
        const {email} = req.body
        //validation to check if user is found or not
        const user = await userModel.findOne({email})
        if(!user)
        {
            throw new Error('User Not Found');
        }
        // if(inventoryType === "in" && user.role !== 'donor')
        // {
        //     throw new Error('Not a donor account');
        // }
        // if(inventoryType === "out" && user.role !== 'hospital')
        // {
        //     throw new Error('Not a hospital');
        // }

        if(req.body.inventoryType == 'out'){
            const requestedBloodGroup = req.body.bloodGroup
            const requestedQuantityOfBlood = req.body.quantity
            const organisation = new mongoose.Types.ObjectId(req.body.userId)
            //Calculate Blood Quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                      organisation,
                      inventoryType: "in",
                      bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                      _id: "$bloodGroup",
                      total: { $sum: "$quantity" },
                    },
                },               
            ])
            // console.log("Total In", totalInOfRequestedBlood);
            const totalIn = totalInOfRequestedBlood[0]?.total ||0;
            //Calculate Out Blood Quantity
            const totalOutOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                      organisation,
                      inventoryType: "out",
                      bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                      _id: "$bloodGroup",
                      total: { $sum: "$quantity" },
                    },
                },               
            ])
            const totalOut = totalOutOfRequestedBlood[0]?.total ||0;

            //In and out Calculation
            const availableQuantityOfBloodGroup = totalIn-totalOut;
            //Quantity validation
            if(availableQuantityOfBloodGroup<requestedQuantityOfBlood){
                return res.status(500).send({
                    success:false,
                    message:`Only ${availableQuantityOfBloodGroup}ml of ${requestedBloodGroup.toUpperCase()} is available `
                })
            }
            req.body.hospital = user?._id;
        }else{
            req.body.donor = user?._id;
        }

        //save record
        const inventory = new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({
            success: true,
            message: 'New blood record added'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Create Inventory API'
        });
    }
};

//GET all blood records
const getInventoryController = async(req,res) => {
    try {
        const inventory = await inventoryModel.find({organisation:req.body.userId})
        .populate('donor').populate('hospital').sort({createdAt: -1}); //sort the inventories based on createdAt as we are using timestamps i.e latest records are placed at top....these are the filters that we add
        return res.status(200).send({
            success: true,
            message: 'Recieved all records succesfully',
            inventory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: 'Error in GET all Inventory',
            error
        });
    }
};

//GET hospital blood records
const getInventoryHospitalController = async(req,res) => {
    try {
        const inventory = await inventoryModel.find(req.body.filters)
        .populate('donor').populate('hospital').populate('organisation').sort({createdAt: -1}); //sort the inventories based on createdAt as we are using timestamps i.e latest records are placed at top....these are the filters that we add
        return res.status(200).send({
            success: true,
            message: 'Recieved all hospital consumer records succesfully',
            inventory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: 'Error in GET consumer Inventory',
            error
        });
    }
};

//GET blood records of 3
const getRecentInventoryController = async (req,res) => {
    try {
        const inventory = await inventoryModel.find({
            organisation:req.body.userId
        }).limit(3).sort({createdAt: -1})
        return res.status(200).send({
            success:true,
            message:'Recent Inventory Data',
            inventory
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Recent Inventory API',
            error
        })
    }

};

//GET donor records
const getDonorsController = async (req,res) => {
    try {
        const organisation = req.body.userId
        //Find Donors
        const donorId = await inventoryModel.distinct('donor',{
            organisation
        });   
        // console.log(donorId);
        const donors = await userModel.find({_id:{$in: donorId}})
        return res.status(200).send({
            success: true,
            message: 'Donor records fetched succesfully',
            donors,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Donor Records',
            error
        })
    }

};

//GET Hospital records
const getHospitalsController = async (req,res) => {
    try {
        const organisation = req.body.userId
        //Get Hospital id
        const hospitalId = await inventoryModel.distinct('hospital',{
            organisation
        });   
        // Find Hospitals
        const hospitals = await userModel.find({_id:{$in: hospitalId}})
        return res.status(200).send({
            success: true,
            message: 'Hospital data fetched succesfully',
            hospitals,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in GET Hospital API',
            error
        })
    }

};

//GET Organisation records
const getOrganisationsController = async (req,res) => {
    try {
        const donor = req.body.userId
        //Get Organisation id
        const organisationId = await inventoryModel.distinct('organisation',{
            donor
        });   
        // Find Organisations
        const organisations = await userModel.find({_id:{$in: organisationId}})
        return res.status(200).send({
            success: true,
            message: 'Organisation data fetched succesfully',
            organisations,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Organisation API',
            error
        });
    }

};

//GET Organisation for hospitals records
const getOrganisationsForHospitalsController = async (req,res) => {
    try {
        const hospital = req.body.userId
        //Get Organisation id
        const organisationId = await inventoryModel.distinct('organisation',{
            hospital
        });   
        // Find Organisations
        const organisations = await userModel.find({_id:{$in: organisationId}})
        return res.status(200).send({
            success: true,
            message: 'Organisation data for Hospitals fetched succesfully',
            organisations,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Organisation for Hospitals API',
            error
        });
    }

};

//exports
module.exports = {createInventoryController, getInventoryController, getDonorsController, getHospitalsController, getOrganisationsController, getOrganisationsForHospitalsController, getInventoryHospitalController, getRecentInventoryController};