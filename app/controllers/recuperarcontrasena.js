import EmberController from '@ember/controller';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default EmberController.extend({
	session: inject('session'),
	init:function() {
	},
	actions:{
		recuperaContrasena(){
			var counter = 0
			var  crro_crprtvo = this.getProperties('txt_crro_crprtvo');
			if(crro_crprtvo.txt_crro_crprtvo != ''){
				$.post( ENV.SERVER_API+"/api/users/claveTemporal", { "crro_crprtvo": crro_crprtvo.txt_crro_crprtvo}).done(function( data ) {

					$("#success").html(data.success).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
							$("#success").slideUp(ENV.TIME_IN_ALERT);
							console.log(data.tkn);
							setTimeout(function () {
										window.location.href='/responderpregunta?token='+data.tkn; //ahora direcciona a responderpregunta
							}, 2000);
					});
				}).fail(function(data){
					$("#danger").html(data.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
							$("#danger").slideUp(ENV.TIME_IN_ALERT);
					});
				});
			}else{
				$("#danger").html("Debes digitar el Correo").fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
						$("#danger").slideUp(ENV.TIME_IN_ALERT);
				});
			}
		}
	}
});
