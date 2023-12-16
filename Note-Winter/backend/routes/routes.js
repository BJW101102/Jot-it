const express = require('express');
const router = express.Router();
const Model = require('../models/model');
const bcrypt = require('bcrypt');
module.exports = router;

//Post Route for new users
router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const exisitingUser = await Model.findOne({username});
    if (exisitingUser){
        return res.status(401).json({message: "Username already taken"});
    }
    console.log("Username: %s \nPassword: %s", username, password);
    const user = new Model({
        username: username,
        password: password
    })
    try {
        const userToSave = await user.save();
        console.log("User Saved: %s", userToSave);
        req.session.user = {
            username: user.username,
            password: user.password,
            _id: user._id
        };
        console.log('Session ID after sign-up:', req.sessionID);
        console.log('User ID after sign-up:', req.session.user);
        res.status(200).json({ message: 'User saved successfully' });
    }
    catch (error) {

        res.status(400).json({ message: error.message })
    }
});

//Post Route for exisiting users
router.post('/login', async (req, res) =>{
const username = req.body.username;
const password = req.body.password;

try {
const user = await Model.findOne({username});
 if (!user){
    res.status(400).json({message: "User not found"});
 }

 const passwordMatch = await bcrypt.compare(password, user.password);
 if(!passwordMatch){
    return res.status(400).json({message: "Invalid Password"});
 }

 req.session.user = {
    username: user.username,
    password: user.password,
    _id: user._id
};
 return res.status(200).json({message: "Valid, User can login"});
}
catch(error){
    res.status(400).json({message: error.message});
}
});

//Get Route for Current User
router.get('/user', async (req, res) => {
    try {
        if (!req.session.user) {
            console.log("No Sessions");
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const userInfo = req.session.user;
        const user = await Model.findById(userInfo._id);
        if (!user){
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(200).json({username: user.username});
    }
    catch(error){
        res.status(400).json({ message: error.message })
    }
});

// Delete all entries route
router.delete('/deleteAll', async (req, res) => {
    try {
      // Use the Mongoose Model to delete all entries
      await Model.deleteMany({});
  
      res.status(200).json({ message: 'All entries deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });