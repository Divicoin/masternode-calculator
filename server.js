const express = require('express');
const bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 1500;


require('./routes/main-route.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static('public'));

require('./api/api')(app);

app.listen(PORT, function() {
    console.log('App listening on port: ' + PORT);
});

