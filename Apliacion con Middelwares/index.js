const express = require("express");
//const usuariosRutas=require("./rutas/rutasUsuarios");
//const usuariosRutas=require("./rutas/rutasProductos");
const usuariosRutas=require("./rutas/rutasVentas");

require("dotenv").config();


const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

/*app.use(session({
    secret:process.env.SESSION_SECRETO,
    resave:true,
    saveUninitialized:true
}));*/

app.use("/",usuariosRutas);


var port=process.env.PORT || 3000;    

app.listen(port,()=>{
    console.log("HOLaaa, SERVIDOR EN http://localhost:"+port);
});