const express = require ("express");
require('dotenv').config();
const app = express();
const indexRouter = require('../routes');
const homeRouter = require('../routes');
const trabajoRouter = require('../routes');

//RUTAS
app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/trabajo', trabajoRouter);


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("servidor en http://localhost:"+port);
    
});