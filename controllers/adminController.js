const userModel = require("../models/userModel")

//GET Donor List
const getDonorsListController = async(req,res) => {
    try {
        const donorData = await userModel.find({role:'donor'}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:donorData.length,
            messgae:'Donor List Fetched Successfully',
            donorData,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            messgae:'Error in Donor List API',
            error
        })
    }
}

//GET Hospital List
const getHospitalsListController = async(req,res) => {
    try {
        const hospitalData = await userModel.find({role:'hospital'}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:hospitalData.length,
            messgae:'Hospital List Fetched Successfully',
            hospitalData,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            messgae:'Error in Hospital List API',
            error
        })
    }
}

//GET Organisation List
const getOrganisationsListController = async(req,res) => {
    try {
        const organisationData = await userModel.find({role:'organisation'}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:organisationData.length,
            messgae:'Organisation List Fetched Successfully',
            organisationData,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            messgae:'Error in Organisation List API',
            error
        })
    }
};

//Delete Donor
const deleteDonorController = async(req,res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'Record deleted successfully',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            messgae:'Error while deleting Record',
            error
        })
    }
};

module.exports ={getDonorsListController, getHospitalsListController, getOrganisationsListController, deleteDonorController}