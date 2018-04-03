import EmberController from '@ember/controller';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default EmberController.extend({
	session: inject('session'),
	init:function() {
	},
	actions: {
		enviarClave(){
			var lc_clve_tmp = this.getProperties('claveTemporal')
			if(lc_clve_tmp.claveTemporal != ''){
				$.post( ENV.SERVER_API+"/api/users/validaClavetemporal", { "clve_tmprl": lc_clve_tmp.claveTemporal}).done(function( data ) {
					if(data.success == true){
					$("#success").html('Redireccionando un Momento Porfavor...').fadeTo(3000, 500).slideUp(500, function(){
							$("#success").slideUp(500);
							setTimeout(function () {
										window.location.href='/cambiarcontrasena';
							}, 2000);
					});
				}else{
					$("#danger").html('Clave Temporal no se Encuentra en el sistema o Expiró inténtelo de Nuevo').fadeTo(5000, 500).slideUp(500, function(){
							$("#danger").slideUp(500);
							setTimeout(function () {
										window.location.href='/recuperarcontrasena';
							}, 2000);
					});
				}
				}).fail(function(data){
					$("#danger").html(data.responseJSON.error).fadeTo(5000, 500).slideUp(500, function(){
							$("#danger").slideUp(500);
					});
				});
			}else{
				$("#danger").html("Debes digitar una Clave Temporal").fadeTo(5000, 500).slideUp(500, function(){
						$("#danger").slideUp(500);
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
