import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { inject } from '@ember/service';
import $ from 'jquery';

export default Route.extend({
  session: inject('session'),
  model:function(){
    let{access_token,cookie_higia} = this.get('session.data.authenticated');
    var formdata = new FormData();
    console.log(ln_id_mnu_ge);
    var	ln_id_mnu_ge = getIdMenu(this.routeName);
    formdata.append('id_mnu_ge',ln_id_mnu_ge);
    formdata.append('id_undd_ngco',cookie_higia.id_undd_ngco);
     return $.ajax({
      headers:{"Authorization": access_token},
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      data:formdata,
      url: ENV.SERVER_API+"/api/preguntasSg/listarMisPreguntas",
    }).then(function (result) {
      var obj={"preguntasseguridad":[]};
      var myModel = {"rspsta":"","dscrpcn":"","id":"","estdo":"","id_prgnt_sgrdd_ge":"","id_mnu_ge":""};
      if(result.error){
         obj["preguntasseguridad"]["datos"]=myModel;
      }else {
          obj["preguntasseguridad"]["datos"]=result;
      }

      var columns = [{"propertyName":"dscrpcn","title" :"Pregunta"},
        {"propertyName":"estdo","title" :"Estado"},
        {"title": "Modificar","component": "editRow","editable": false},
      ];
      obj["preguntasseguridad"]["columns"] = columns;
      obj["preguntasseguridad"]["modelCreator"] = myModel;
      obj["preguntasseguridad"]["id_mnu_ge"] = 330;
      return obj;
    })
  }
});
