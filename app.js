const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const dbConnect = require('./dbConnect');
const { posApp } = require('./config');

require('dotenv').config();

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
// TODO :: Refactor Uploads to use Firebase
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
    multer({ storage: fileStorage, fileFilter })
    .single('image')
);

// Add Routes
// app.use('/feed', feedRoutes);
// app.use('/auth', authRoutes);
// app.use('/countries', countryRoutes);
// app.use('/company', companyRoutes);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500,
          message = error.message,
          data = error.data || [];

    res.status(statusCode).json({
        message,
        data
    })
});

//  Connect to DB and start server
dbConnect(() => {
    const server = app.listen(posApp.port, () => {
        console.log(`Server started on port ${posApp.port}`);
    });
    const io = require('./socket').init(server);
    io.on('connection', (socket) => {
        console.log('a new user connected');
    });

    io.on('disconnect', () => {
        console.log('a user disconnected');
    });

    io.on('message', (message) => {
        console.log(message);
        io.emit('message', message);
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
        io.close();
        process.exit(0);
    });
});
