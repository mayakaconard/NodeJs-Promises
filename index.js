
var express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var routes = require('./app/routes/api/routes.js'); //importing route
// routes(app); //register the route
require('./pdfGenerator.js');
app.listen(port);


console.log('Server running  port: ' + port);