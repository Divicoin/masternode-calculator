var express = require('express');

var app = express();
var PORT = process.env.PORT || 1500;

require('./routes/main-route.js');

app.use(express.static('public'));

app.listen(PORT, function() {
    console.log('App listening on port: ' + PORT);
});