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
			var _this = this;

			if(lc_clve_tmp.claveActual != ''){
				$.post( ENV.SERVER_API+"/api/users/actualizarContrenaInterna", { "clve_tmprl": lc_clve_tmp.claveActual,"nva_cntrsna": lc_nva_cntrsna.nuevaContrasena,"rnva_cntrsna": lc_nva_Rcntrsna.nuevaRcontrasena, "id_lgn_ge":cookie_higia.id_lgn_ge}).done(function( data ) {
					if(data.success == true){
					$("#success").html('La contraseña se cambio exitosamente. Redireccionando un Momento Por favor...').fadeTo(3000, 500).slideUp(500,()=>{

							$("#success").slideUp(500);
							setTimeout( ()=> {
										//set
										var mdf = _this.get('session.data.authenticated');

										console.log('aqui valor de cookie higia',mdf.cookie_higia.cmbo_cntrsna);
										if(mdf.cookie_higia.cmbo_cntrsna){
											console.log('entro al logout');


										//	var _this = this;
											let{access_token,cookie_higia} = _this.get('session.data.authenticated');
											console.log('Authorization',access_token);
											Ember.$.ajax({
												headers:{"Authorization": access_token},
												cache: false,
												contentType: false,
												processData: false,
												type: 'POST',
												url: ENV.SERVER_API+"/api/auth/logout",
											}).then(function (result) {
												console.log('result',result);
												if(result.success == "BYE" ){
													//_this.get('session').invalidate();
													window.location.href='/login';
												}
											}).catch( function(error){
												console.log('entro al catch',error);
											})


										}
									  //mdf.set('cmbo_cntrsna',false); //Dont work

										//Se hace redireccionamiento al logout


										window.location.href='/protected';
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
