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

			let{access_token,cookie_higia} = this.get('session.data.authenticated');

			console.log(cookie_higia.id_lgn_ge);

			if(lc_clve_tmp.claveActual != ''){
				$.post( ENV.SERVER_API+"/api/users/actualizarContrenaInterna", { "clve_tmprl": lc_clve_tmp.claveActual,"nva_cntrsna": lc_nva_cntrsna.nuevaContrasena,"rnva_cntrsna": lc_nva_Rcntrsna.nuevaRcontrasena, "id_lgn_ge":cookie_higia.id_lgn_ge}).done(function( data ) {
					if(data.success == true){
					$("#success").html('La contraseña se cambio exitosamente. Redireccionando un Momento Por favor...').fadeTo(3000, 500).slideUp(500, function(){
							$("#success").slideUp(500);
							setTimeout(function () {
										window.location.href='/login';
							}, 2000);
					});
				}else{
					$("#danger").html('Clave Temporal no se Encuentra').fadeTo(5000, 500).slideUp(500, function(){
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
				$("#danger").html("Debe digitar su Clave Actual").fadeTo(5000, 500).slideUp(500, function(){
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
