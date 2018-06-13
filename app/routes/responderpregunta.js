import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { inject } from '@ember/service';
export default Route.extend({
  session: inject('session'),
  queryParams:{
    token:""
  },

  model:function(params){
    var token = params.token;
    let{access_token,cookie_higia} = this.get('session.data.authenticated');
    var formdata = new FormData();
  	formdata.append('lc_token',token);
    console.log('lc_token='+token);
    var parametros = {
              "lc_token" : token,
      };

      $.post( ENV.SERVER_API+"/api/users/preguntasSeguridad", parametros).done(function( data ) {
        if(data){
          var resultado = '';
          var id;
          for (var i in data){
            if (data[i]['id'] === undefined) {
               // se ejecutan estas instrucciones
            }else{
              id = data[i]['id'];
              $("#pr"+i).html(data[i]['dscrpcn']);
              $("#txt_idpr"+i).val(id);
            }
          }
          $("#token").val(token);
          $("#success").html('¡Responde las preguntas de seguridad!').fadeTo(3000, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
              $("#success").slideUp(ENV.TIME_IN_ALERT);
              setTimeout(function () {
                    //window.location.href='/cambiarcontrasena';
              }, 2000);
          });
      }else{
        $("#danger").html('Error de conexión').fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
            $("#danger").slideUp(ENV.TIME_IN_ALERT);
            setTimeout(function () {
                //  window.location.href='/recuperarcontrasena';
            }, 2000);
        });
      }
      }).fail(function(data){
          console.log('error del fail');
          $("#danger").html(data.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
							$("#danger").slideUp(ENV.TIME_IN_ALERT);
					});
      });

    /*
  	return Ember.$.ajax({
			headers:{"Authorization": access_token},
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			data:formdata,
			url: ENV.SERVER_API+"/api/users/preguntasSeguridad",
		}).then(function (result) {
        //return result;
        console.log(result);
        return result;
        if(result.success == true){
            console.log("hola ingreso aaqui -- TODOS OK");
        }else{
            console.log("hola ingreso aaqui -- ERROR");
        }
        //console.log(result);
    }).fail(function(error){
    //  console.log(error.responseJSON);
      console.log(error.responseJSON);
      return error;
    });
    */



  }

});
