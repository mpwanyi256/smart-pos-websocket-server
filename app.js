const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const { Server } = require("socket.io");

require('dotenv').config({ path: './.env' })

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    // HANDLE CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
    multer({ storage: fileStorage, fileFilter })
    .single('image')
);

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500,
          message = error.message,
          data = error.data || [];

    res.status(statusCode).json({
        message,
        data
    })
});

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@restapiwithmongo.spews.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(client => {
        const server = app.listen(8080);
        const io = require('./socket').init(server);
        io.on('connection', (socket) => {
            console.log('a new user connected');
        });
    })
    .catch(e => {
        console.log('Failed to connect to server', e);
    });
