'use strict';

import express from 'express';

let router = express.Router();

// add routes here

router.get('/', (req, res) => {
        res.send('Hello!');
});

module.exports = router;
