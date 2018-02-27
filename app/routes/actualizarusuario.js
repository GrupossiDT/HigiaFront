import Route from '@ember/routing/route';

export default Route.extend({
  model:function(){
    let usuario = {};
    usuario["password"]="";
    usuario["nombre_usuario"]="";
    usuario["login"]="";
    usuario["imge_pth"]="";
    usuario["id_login_ge"]="";
    var modelo=[];
    modelo[0] = usuario;
    return modelo;
  }
});
