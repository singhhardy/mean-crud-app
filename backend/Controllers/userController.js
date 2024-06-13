const asyncHandler = require('express-async-handler')
const User = require('../Modals/userModal') 

// Get All Users
const getUsersData = asyncHandler(async(req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

// Get Single User

const getSingleUser = asyncHandler(async (req, res) => {
    const {id} = req.params
    const user = await User.findById(id)

    if(!user){
        res.status(404)
        throw new Error('User not found')
    }

    return res.status(200).json({user})
})

// Create a user
const createUser = asyncHandler(async (req, res) => {
    const { name, age, email, phone} = req.body
    const profileImage = req.file ? req.file.filename : null;

    try{
        const user = await User.create({
            name,
            age,
            email,
            phone,
            profileImage
        })
    
        res.status(201).json({
            message: "User created successfully",
            user
        })
    } catch(err){
        console.error(err)
        res.status(400).json({message: "Error creating user"})
    }
})


// Update a User
const updateUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const userUpdates = req.body;
    const profileImage = req.file ? req.file.filename : null;
    try{
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        Object.assign(user, userUpdates);
        if(profileImage){
            user.profileImage = profileImage
        }

        const updatedUser = await user.save();

        res.status(200).json({
            message: "user updated successfully",
            user: updatedUser
        })

    } catch(err){
        console.log(err)
        res.status(400).json({message: "Error updating user"})
    }
})

// Delete a User
const deleteUser = asyncHandler(async(req, res) => {
    const {id} = req.params
    const user = await User.findById(id)

    await user.deleteOne();

    res.status(200).json({message: 'User deleted successfully'})
})

module.exports = {
    getUsersData,
    createUser,
    updateUser,
    deleteUser,
    getSingleUser
}