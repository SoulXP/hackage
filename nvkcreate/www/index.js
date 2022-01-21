const fs = require('fs');
const https = require('https');
const express = require('express');

// Init app
const app = express(); 

// https://api.gumroad.com/v2/licenses/verify
// POST
// product_permalink
// license_key
// increment_uses_count

app.post('/v2/licenses/verify', (req, res) => {
    console.log(`Receiving request from ${req.ip}`);
    return res.status(200).json({
        success: true,
        refunded: false,
        disputed: false,
        chargebacked: false,
        uses: 0,
        quantity: 1,
        message: 'opensourceftw'
    });
});

const port = 443;
const certs = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.cert')
};

https.createServer(certs, app).listen(port, () => {
    console.log(`Server initialized on port ${port}`)
});