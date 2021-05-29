const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}))

const RequestIp = require('@supercharge/request-ip')


app.get('/api/whoami', function (req, res) {

    res.json({
        ipaddress: RequestIp.getClientIp(req),
        language : req.header('accept-language'),
        software: req.header('user-agent')
    });
});

const listener = app.listen(process.env.port || 3000, function () {
    console.log("server started on port " + listener.address().port);
});
