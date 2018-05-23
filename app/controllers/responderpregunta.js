import EmberController from '@ember/controller';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default EmberController.extend({
	session: inject('session'),
	init:function() {
			//this.set('model.pr1','CUAL ES SU NOMBRE');
			let result =  $.ajax({
          type: "POST",
          url: ENV.SERVER_API+_this.get('url'),
          data: lo_data,
        });
				console.log(result);
	},
	actions: {
		enviarClave(){
			var lc_clve_tmp = this.getProperties('claveTemporal')
			if(lc_clve_tmp.claveTemporal != ''){
				$.post( ENV.SERVER_API+"/api/users/validaClavetemporal", { "clve_tmprl": lc_clve_tmp.claveTemporal}).done(function( data ) {
					if(data.success == true){
					$("#success").html('Redireccionando un Momento Porfavor...').fadeTo(3000, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
							$("#success").slideUp(ENV.TIME_IN_ALERT);
							setTimeout(function () {
										window.location.href='/cambiarcontrasena';
							}, 2000);
					});
				}else{
					$("#danger").html('Clave Temporal no se Encuentra en el sistema o Expiró inténtelo de Nuevo').fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
							$("#danger").slideUp(ENV.TIME_IN_ALERT);
							setTimeout(function () {
										window.location.href='/recuperarcontrasena';
							}, 2000);
					});
				}
				}).fail(function(data){
					$("#danger").html(data.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
							$("#danger").slideUp(ENV.TIME_IN_ALERT);
					});
				});
			}else{
				$("#danger").html("Debes digitar una Clave Temporal").fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
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
