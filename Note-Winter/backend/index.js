//@author: Brandon Walton
//index {Backend}

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const mongoString = process.env.DATABASE_URL;
const database = mongoose.connection;
const routes = require('./routes/routes');


mongoose.connect(mongoString);

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log("Database Connected");
});

const app = express();

//BEGIN: Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());

app.use(session({
    secret: 'test-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true in a production environment with HTTPS
        httpOnly: true,
        maxAge: 3600000, // 1 hour
    },
}));
//END: Middleware



// Use routes
app.use('/api', routes);


const PORT = 5500;

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});


