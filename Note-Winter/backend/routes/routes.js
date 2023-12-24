//@author: Brandon Walton
//Routes

const express = require('express');
const router = express.Router();
const Model = require('../models/model');
const bcrypt = require('bcrypt');
module.exports = router;


//========POST ROUTES========/

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
        password: password,
        theme: false
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
        const color = req.body.color;
        const isFavorite = req.body.isFavorite;
        userInfo.notes.push({
            header: header,
            body: body,
            color: color,
            isFavorite: isFavorite
        });

        // console.log(userInfo);
        await userInfo.save();
        const lastIndex = userInfo.notes.length - 1;
        const noteID = userInfo.notes[lastIndex]._id;

        res.status(200).json({ noteID: noteID, message: 'Successfuly stored notes' });
    }
    catch (error) {
        res.status(400).json({ message: 'Internal server error', error: error.message });
    }
});

//========GET ROUTES========/

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
        res.status(200).json({ username: user.username, theme: user.theme });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

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
        // console.log("User working with is: ", userInfo.notes);

        const notesData = userInfo.notes.map(note => ({
            header: note.header,
            body: note.body,
            color: note.color,
            isFavorite: note.isFavorite,
            id: note._id,
        }));

        return res.status(200).json(notesData);

    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });

    }
});

//========Patch ROUTES========/

router.patch('/changecolor', async (req, res) => {
    try {
        const user = req.session.user;
        console.log("Session is: ", user);
        if (!user) {

            console.log("No User");
            return res.status(100).json({ message: 'Internal server error', error: error.message });
        }
        // console.log("LETS GO");

        const userInfo = await Model.findById(user._id);
        if (!userInfo) {
            console.log("LETS GO");
            return res.status(401).json({ message: 'User not found' });
        }


        const color = req.body.color;
        const index = req.body.noteIndex;
        console.log(color);

        userInfo.notes[index].color = color;
        await userInfo.save();

        console.log(userInfo);


        // console.log("Here");
        res.status(200).json({ message: "Congrats" });

    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.patch('/favorite', async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const userInfo = await Model.findById(user._id);
        if (!userInfo) {
            return res.status(401).json({ message: 'User not found' });
        }

        const situation = req.body.situation;
        const favNoteID = req.body.favNoteID;
        const swapNoteID = req.body.swapNoteID;
        const favNoteIndex = userInfo.notes.findIndex(note => note.id === favNoteID);
        const favNote = userInfo.notes[favNoteIndex];
        // console.log("Fav Note Index is: ", favNoteIndex);
        // console.log("Fav Note isFavorite?: ", userInfo.notes[favNoteIndex]);

        switch (situation) {
            case 0: //Favorite No Swap
                userInfo.notes[favNoteIndex].isFavorite = true;
                break;
            case 1: //Favorite With Swap
                const swapNoteIndex = userInfo.notes.findIndex(note => note.id === swapNoteID);
                userInfo.notes[favNoteIndex].isFavorite = true;
                // console.log("Swap Index is: ", swapNoteIndex);
                if (swapNoteIndex === -1) {
                }
                [userInfo.notes[favNoteIndex], userInfo.notes[swapNoteIndex]] = [
                    userInfo.notes[swapNoteIndex],
                    userInfo.notes[favNoteIndex],
                ];
                // console.log("After swap:", userInfo.notes);
                break;
            case 2: //Unfavorite
                userInfo.notes[favNoteIndex].isFavorite = false;
                userInfo.notes[favNoteIndex].isFavorite = false;
                userInfo.notes.splice(favNoteIndex, 1);
                userInfo.notes.push(favNote);
        }
        await userInfo.save();
        return res.status(200).json({ message: "Favorite handled" });


    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });

    }
});

router.patch('/theme', async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const userInfo = await Model.findById(user._id);
    if (!userInfo){
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const theme = req.body.theme;
    userInfo.theme = theme;
    await userInfo.save();
    return res.status(200).json({ message: 'Theme Saved' });
});

//========DELETE ROUTES========/

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

// Delete route for user Notes
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

        const noteToDelete = req.body.noteToDelete;
        const index = userInfo.notes.findIndex(note => note.header === noteToDelete.header && note.body === noteToDelete.body);

        if (index === -1) {
            return res.status(404).json({ message: 'Note not found' });
        }

        console.log("Deleting this element-index: ", index);
        userInfo.notes.splice(index, 1);
        await userInfo.save();
        res.status(200).json({ message: 'Successfuly Deleted notes' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});




