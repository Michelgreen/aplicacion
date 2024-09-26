var express = require('express');
var app = express();

var globalMiddleware=((req,res,next)=>{
    console.log("Middleware para todas las rutas");
    next();
    
});

module.exports = globalMiddleware;