var express = require('express');
var path = require('path');
var router = require('./routes');
var bodyParser = require('body-parser');


var app =express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, './public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use('/', router);

module.exports = app;

app.listen(3000, () => {
    console.log("Listen http://localhost:3000/")
});