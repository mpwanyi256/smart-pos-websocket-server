const express = require('express');
const { body } = require('express-validator');
const isAuthenticated = require('../middleware/isAuthenticated');

const feedControllers = require('../controllers/feed');

const router = express.Router();

router.get('/posts', isAuthenticated, feedControllers.getPosts);

router.post(
    '/create-feed',
    isAuthenticated,
    [
        body('title')
        .trim()
        .isLength({ min: 5 }),
        body('content')
        .trim()
        .isLength({ min: 5 })
    ],
    feedControllers.createPost
);

router.get('/post/:postId', isAuthenticated, feedControllers.getPost);

router.put('/post/:postId',
    isAuthenticated,
    [
        body('title')
        .trim()
        .isLength({ min: 5 }),
        body('content')
        .trim()
        .isLength({ min: 5 })
    ],
    feedControllers.updatePost
);

router.delete('/post/:postId', isAuthenticated, feedControllers.deletePost);

module.exports = router;
