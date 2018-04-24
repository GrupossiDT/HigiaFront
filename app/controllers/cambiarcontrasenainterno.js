import EmberController from '@ember/controller';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default EmberController.extend({
	session: inject('session'),
	init:function() {
	},
	actions: {
		cambiarcontrasenainterno(){
			var lc_clve_tmp = this.getProperties('claveActual')
      var lc_nva_cntrsna = this.getProperties('nuevaContrasena')
      var lc_nva_Rcntrsna = this.getProperties('nuevaRcontrasena')
			if(lc_clve_tmp.claveActual != ''){
				$.post( ENV.SERVER_API+"/api/users/actualizarContrasena", { "clve_tmprl": lc_clve_tmp.claveActual,"nva_cntrsna": lc_nva_cntrsna.nuevaContrasena,"rnva_cntrsna": lc_nva_Rcntrsna.nuevaRcontrasena}).done(function( data ) {
					if(data.success == true){
					$("#success").html('Redireccionando un Momento Porfavor...').fadeTo(3000, 500).slideUp(500, function(){
							$("#success").slideUp(500);
							setTimeout(function () {
										window.location.href='/login';
							}, 2000);
					});
				}else{
					$("#danger").html('Clave Temporal no se Encuentra en el sistema o Expiró inténtelo de Nuevo').fadeTo(5000, 500).slideUp(500, function(){
							$("#danger").slideUp(500);
							setTimeout(function () {
										//window.location.href='/recuperarcontrasena';
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
			var lc_clve_tmp = this.getProperties('claveActual')

			if(lc_clve_tmp.claveActual != ''){
				 $('#btn_snd_tpm').removeAttr('disabled');
			}else{
					$('#btn_snd_tpm').attr('disabled','disabled');
			}
		}

		}
});
