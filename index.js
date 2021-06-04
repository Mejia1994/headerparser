const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}))

const mustache = require("mustache-express")
app.engine('html', mustache())
app.set('view engine', 'html')
app.set('views', __dirname + "/views");

const RequestIp = require('@supercharge/request-ip')

app.use(express.static('public'));

app.get("/", function (req, res) {
    const data = {
        ipaddress: RequestIp.getClientIp(req),
        language: req.header('accept-language'),
        software: req.header('user-agent')
    };

    res.render('index', data);
});

app.get('/api/whoami', function (req, res) {

    res.json({
        ipaddress: RequestIp.getClientIp(req),
        language: req.header('accept-language'),
        software: req.header('user-agent')
    });
});

const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("server started on port " + listener.address().port);
});
