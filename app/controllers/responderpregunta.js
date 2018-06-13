import EmberController from '@ember/controller';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default EmberController.extend({
	session: inject('session'),
	init:function() {
			//this.set('model.pr1','CUAL ES SU NOMBRE');
		/*	let result =  $.ajax({
          type: "POST",
          url: ENV.SERVER_API+_this.get('url'),
          data: lo_data,
        });
				console.log(result);*/
				console.log('inicio en el controlador');
	},
	actions: {
		enviarClave(){
			//console.log(model.get('firstObject'));
			console.log('no pudo pasar');

			var lc_clve_tmp = this.getProperties('claveTemporal')
			var token = $("#token").val()
			if(token != ''){

				var parametros = {
							 "token" : token,
							 "txt_idpr0" : $("#txt_idpr0").val(),
							 "txt_idpr1" : $("#txt_idpr1").val(),
							 "txt_idpr2" : $("#txt_idpr2").val(),
							 "txt_pregunta0" : $("#txt_pregunta0").val(),
							 "txt_pregunta1" : $("#txt_pregunta1").val(),
							 "txt_pregunta2" : $("#txt_pregunta2").val(),
			 };

				$.post( ENV.SERVER_API+"/api/users/reponderPreguntasSeguridad", parametros).done(function( data ) {
					if(data.success){
					$("#success").html('Redireccionando un Momento Porfavor...').fadeTo(3000, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
							$("#success").slideUp(ENV.TIME_IN_ALERT);
							setTimeout(function () {
									//TO DO OK
									window.location.href='/cambiarcontrasena';
							}, 2000);
					});
				}else{
					$("#danger").html('Clave Temporal no se Encuentra en el sistema o Expiró inténtelo de Nuevo').fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
							$("#danger").slideUp(ENV.TIME_IN_ALERT);
							setTimeout(function () {
										////window.location.href='/recuperarcontrasena';
							}, 2000);
					});
				}
				}).fail(function(data){
					$("#danger").html(data.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
							//Se direcciona hacia atras, a recuperar contraseña
							$("#danger").slideUp(ENV.TIME_IN_ALERT);
							window.location.href='/recuperarcontrasena';
					});
				});
			}else{
				$("#danger").html("No existe un token valido").fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
						$("#danger").slideUp(ENV.TIME_IN_ALERT);
				});
			}
		},
		enable_btn(){
			var lc_clve_tmp = this.getProperties('claveTemporal')

			if(lc_clve_tmp.claveTemporal != ''){
				 $('#btn_snd_tpm').removeAttr('disabled');
			}else{
					$('#btn_snd_tpm').attr('disabled','disabled');
			}
		}

		}
});
