// const { createServer } = require('http');//node.js

// const hostname = 'localhost';//localhost
// const port = 6969;//

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n Hoang xin phep tu mo javascript voi hoi dan it');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });




require('dotenv').config();
const express = require('express'); //commonjs
// import express from 'express   //es modules

const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');

const app = express(); //app express
const port = process.env.PORT || 8888; //port => hardcode . uat . production
const hostname = process.env.HOST_NAME;


//Phải khai báo các template engine trước khi khai báo các route
configViewEngine(app);

// khai báo route
app.use('/', webRoutes);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});