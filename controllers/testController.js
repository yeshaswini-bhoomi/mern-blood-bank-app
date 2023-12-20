//on adding req,res a normal arrow function turns into a call back function
const testController = (req,res) => {
    res.status(200).send({
        message: "Welcome User",
        success: true,
    });
};
//export
module.exports = {testController};