// server/routes/api.js
const express = require('express');
const router = express.Router();

router.get('/message', (req, res) => {
    res.json({ message: 'Hello from the backend! || ye jobportail ke leye h  website' });
});

module.exports = router;