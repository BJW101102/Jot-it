const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');

const User = new mongoose.Schema({
    username: {
        required: true, 
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

//Hashing Password
User.pre('save', async function (next){
try{
    const hashPassword = await bcrpyt.hash(this.password, 10);
    this.password = hashPassword;
    next();
}
catch(error){
    next(error);
}
});

module.exports = mongoose.model('Data', User);
