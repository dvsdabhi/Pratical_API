const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// create user logic
const createUser = async(req,res)=>{
    const data = req.body;
    try{
        const user = await User.findOne({email:data.email});
        if(!user){
            const hashPassword  = await bcrypt.hash(data.password,10);
            const newUser = new User({
                name:data.name,
                email:data.email,
                password:hashPassword,
                country:data.country,
                state:data.state,
                city:data.city
            });
            newUser.save();
            return res.status(200).send({status:200,message:"user created",user:newUser});
        };
        return res.status(200).send({message:"This mail id is already exits"});
    }
    catch(error){
        return res.status(400).send({error:error.message});
    };
};

// user login logic
const userLogin = async(req,res) => {
    const data = req.body;
    try{
        const user = await User.findOne({email:data.email});
        if(!user){
            return res.status(400).send({status:400,message:"First create your account.."});
        }
        const validpassword = await bcrypt.compare(data.password,user.password);
        if(!validpassword){
            return res.status(400).send({status:400,message:"enter a valid password"});
        }
        return res.status(200).send({
            status: 200,
            message: "login success",
            user:user
          });
    }catch(error){
        return res.status(400).send({status:400,message:error.message});
    }
}

// get all user logic

const AllUser = async(req,res) => {
    try{
        const user = await User.find();
        return res.status(200).send({status:200,message:"all user get successfully",allUser:user})
    }catch{
        return res.status(400).send({status:400,message:"not found"});
    }
}

// delete user logic
const deleteUser = async(req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete({_id:id});
        return res.status(200).send({status:"success",message:"usser deleted"});
    } catch (error) {
        return res.status(404).send({status:404,message:"error.message"});
    }
}

// update user details logic
const updateUser = async(req,res) => {
    const {id} = req.params;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate({_id:id},
            {$set:{name:data.name,email:data.email,country:data.country,state:data.state,city:data.city}},
            {new:true}
        );
        return res.status(200).send({status:200,message:"user updated"});
    } catch (error) {
        return res.status(400).send({status:400,message:error.message});
    }
}

// get single user data
const getSingleUser = async(req,res) => {
    const {id} = req.params;
    try{
        const user = await User.findById({_id:id});
        return res.status(200).send({status:200,message:"user getted success",user:user});
    }
    catch(error){
        return res.status(400).send({status:400,message:error.message});
    }
}

module.exports = { createUser, userLogin, AllUser, deleteUser, updateUser, getSingleUser }