const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');

const Notes = new mongoose.Schema({
    header: {
        type: String
    },
    body: {
        type: String
    },
    color: {
        type: Number
    }
})

const User = new mongoose.Schema({
    username: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    notes: {
        type: [Notes]
    }
})

//Hashing Password
// User.pre('save', async function (next) {
//     try {
        
//         const hashPassword = await bcrpyt.hash(this.password, 10);
//         // console.log("Before Hash: ", this.password);
//         this.password = hashPassword;
//         next();
//     }
//     catch (error) {
//         next(error);
//     }
// });

module.exports = mongoose.model('Data', User);
