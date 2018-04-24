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
					console.log(data);
					$("#success").html(data.success).fadeTo(3000, 500).slideUp(500, function(){
							$("#success").slideUp(500);
							setTimeout(function () {
										window.location.href='/clavetemporal';
							}, 2000);
					});
				}).fail(function(data){
					$("#danger").html(data.responseJSON.error).fadeTo(5000, 500).slideUp(500, function(){
							$("#danger").slideUp(500);
					});
				});
			}else{
				$("#danger").html("Debes digitar el Correo").fadeTo(5000, 500).slideUp(500, function(){
						$("#danger").slideUp(500);
				});
			}
		}
	}
});
