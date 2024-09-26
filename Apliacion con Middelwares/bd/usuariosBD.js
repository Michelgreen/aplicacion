const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../clases/UsuarioClase");
const {encriptarPassword, validarPassword}=require("../middlewares/funcionesPassword");

function validarDatos(usuario2){
  var datosCorrectos=false;
  if(usuario2.nombre!=undefined && usuario2.usuario!=undefined && usuario2.password!=undefined){
    datosCorrectos=true;
  }

  return datosCorrectos;

}

async function mostrarUsuarios(){
  const usuarios= await usuariosBD.get();
   //console.log(usuarios);
   var usuariosValidos=[];
   usuarios.forEach(usuario => {
        //console.log(usuario.data());
        const usuario1 = new Usuario({id:usuario.id,...usuario.data()});
        const usuario2 = usuario1.getUsuario;
        if(validarDatos(usuario2)){

          usuariosValidos.push(usuario2);
        }
        
   });
   //console.log(usuariosValidos);
   return usuariosValidos;
}

async function buscarPorId(id) {
  const usuario=await usuariosBD.doc(id).get();
  const usuario1=new Usuario({id:usuario.id,...usuario.data()});
  var usuarioValido={error:true};
  if(validarDatos(usuario1.getUsuario)){
    usuarioValido=usuario1.getUsuario;
  }
  //console.log(usuarioValido);
  return usuarioValido;
}

async function nuevoUsuario(data) {
  const {salt, hash}=encriptarPassword(data.password);
  data.password=hash;
  data.salt=salt;
  data.tipoUsuario="usuario";
  const usuario1=new Usuario(data);
  var usuarioValido=false;
  if(validarDatos(usuario1.getUsuario)){
    await usuariosBD.doc().set(usuario1.getUsuario)
    usuarioValido=true;
  }
  return usuarioValido;
}

async function borrarUsuario(id) {
  const usuario=await buscarPorId(id);
  var borrado=false;
  if(usuario.error!=true){
    await usuariosBD.doc(id).delete();
    borrado=true;
  }
  //console.log(usuario);
  return borrado;
}

module.exports={
  mostrarUsuarios,
  nuevoUsuario,
  borrarUsuario,
  buscarPorId
}

//borrarUsuario("EbFIZRTw4gzsvSpHVEJ2");
//borrarUsuario("mCzknD2L060Cci8xDvQP");
//borrarUsuario("");
data={
  nombre:"Cierrenuevescientos",
  usuario: "CR900",
  password: "chichifli"
}

nuevoUsuario(data);

//buscarPorId("WsH25v1lrLUu7uxykZrb");
//buscarPorId("0ZDpwUBPpPubQsGpqFlW");

//mostrarUsuarios();