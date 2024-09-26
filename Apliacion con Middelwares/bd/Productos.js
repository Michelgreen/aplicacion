const productosBD = require("./conexion").productos;
const Producto = require("../clases/productosClase");

function validarProductos(producto2){
    var datosCorrectos = false;
    if(producto2.cantidad!=undefined && producto2.precio!=undefined && producto2.descripcion!=undefined){
        datosCorrectos = true;
    }
    return datosCorrectos;
}

async function mostrarProductos(){
    const productos = await productosBD.get();
    var productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({id:producto.id,...producto.data()});
        const producto2 = producto1.getProducto;
        if(validarProductos(producto2)){
        productosValidos.push(producto2);
        }
    });
    return productosValidos;
}

async function buscarPorId(id){
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({descripcion: producto.descripcion,...producto.data()});
    var productoValido = {error:true};
    if (validarProductos(producto1.getProducto)){
            productoValido = producto1.getProducto;
    }
    return productoValido;
}

async function nuevoProducto(data){
    const producto1 = new Producto(data);
    var productoValido = false;
    if (validarProductos(producto1.getProducto)){
        await productosBD.doc().set(producto1.getProducto);
        productoValido = true;
    }
    return productoValido;
}

async function borrarProducto(id){
    const producto = await buscarPorId(id);
    var borrado=false;
    if(producto.error!=true){
        await productosBD.doc(id).delete();
        borrado=true;
    }
    return borrado;
}

module.exports={
    mostrarProductos,
    buscarPorId,
    nuevoProducto,
    borrarProducto
}


