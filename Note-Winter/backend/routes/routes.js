//@author: Brandon Walton
//Routes

const express = require('express');
const router = express.Router();
const Model = require('../models/model');
const bcrypt = require('bcrypt');
module.exports = router;

//Post Route for new users
router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const exisitingUser = await Model.findOne({ username });
    if (exisitingUser) {
        return res.status(409).json({ message: "Username already taken" });
    }
    // console.log("Username: %s \nPassword: %s", username, password);
    const user = new Model({
        username: username,
        password: password
    })
    try {
        const userToSave = await user.save();
        // console.log("User Saved: %s", userToSave);
        req.session.user = {
            username: user.username,
            password: user.password,
            _id: user._id
        };
        // console.log('Session ID after sign-up:', req.sessionID);
        // console.log('User ID after sign-up:', req.session.user);
        res.status(200).json({ message: 'User saved successfully' });
    }
    catch (error) {

        res.status(400).json({ message: error.message })
    }
});

//Post Route for exisiting users
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    try {
        const user = await Model.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        // const passwordMatch = await bcrypt.compare(password, user.password);
        // if (!passwordMatch) {
        //     return res.status(400).json({ message: "Invalid Password" });
        // }
        req.session.user = {
            username: user.username,
            password: user.password,
            _id: user._id
        };
        return res.status(200).json({ message: "Valid, User can login" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get Route for Current User
router.get('/user', async (req, res) => {
    try {
        if (!req.session.user) {
            // console.log("No Sessions");
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const userInfo = req.session.user;
        const user = await Model.findById(userInfo._id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(200).json({ username: user.username });
    }
    catch (error) {
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

//Post route for adding Notes
router.post('/notes', async (req, res) => {
    try {

        const user = req.session.user;
        // console.log(user);
        if (!user) {
            console.log("No Sessions");
            return res.status(400).json({ message: 'Internal server error', error: error.message });
        }

        const userInfo = await Model.findById(user._id);
        if (!userInfo) {
            return res.status(400).json({ message: 'Internal server error', error: error.message });
        }
        const header = req.body.header.toString(); // Convert to string if necessary
        const body = req.body.body.toString();
        userInfo.notes.push({
            header: header,
            body: body,
        });
        console.log(userInfo);
        await userInfo.save();
        res.status(200).json({ message: 'Successfuly stored notes' });
    }
    catch (error) {
        res.status(400).json({ message: 'Internal server error', error: error.message });
    }
})

//Get route for user Notes
router.get('/usernotes', async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
        const userInfo = await Model.findById(user._id);
        if (!userInfo) {
            return res.status(401).json({ message: 'User not found' });
        }
        console.log("User working with is: ", userInfo.notes);

        const notesHeader = userInfo.notes.map(note => ({
            header: note.header,
        }));

        const notesBody = userInfo.notes.map(note => ({
            body: note.body,
        }));


        // console.log("Header: ", notesHeader);
        // console.log("Body: ", notesBody);

        return res.status(200).json({ header: notesHeader, body: notesBody });

    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });

    }
})

//Delete route for user Notes
router.delete('/deletenotes', async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            console.log("No session");
            return res.status(500).json({ message: 'Internal server error', error: error.message });

        }
        const userInfo = await Model.findById(user._id);
        if (!userInfo) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }

        const index = req.body.index;
        console.log("Deleting this element-index: ", index);
        userInfo.notes.splice(index, 1);
        await userInfo.save();
        res.status(200).json({ message: 'Successfuly Deleted notes' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
})