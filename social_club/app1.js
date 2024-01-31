const express = require('express');
const server = express();
const port = process.env.port || 3000;

let groups = ["1","2","3","4"];

server.get("/group/:num", (req, res, next) => {
    let number = req.params.num;
    for(value of groups)
        if(value === number)
            res.end(`${value} is best !`);
    next();
});

server.get("/group/", (req, res, next) => {
    let body = "<h1>Groups<h1>";
    for(value of groups)
        body += `<a href="/group/${value}">${value}</a>`;
    res.end(body);
});

server.get("/group/*", (req, res) => {
    res.end("No any");
});

server.get("/", (req, res) => {
    res.end("<a href='/group'>Groups</a>");
});

server.listen(port);