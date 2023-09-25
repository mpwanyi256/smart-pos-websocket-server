const express = require('express');
const router  = express.Router();

const { notify } = require('../socket');

router.post('', (req, res) => {
    const { action, data } = req.body;
    console.log('POST /notify', action, data);

    notify(req.body);
    console.log(req.body);
    res.status(200).json({ message: 'OK' });
});

module.exports = router;
