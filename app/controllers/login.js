import EmberController from '@ember/controller';
import { inject } from '@ember/service';
import ENV from '../config/environment';
import $ from 'jquery';
export default EmberController.extend({
	session: inject('session'),	
	init:function() {
		$('body').toggleClass("bg_login");
		this._super(...arguments);
	},
	actions: {
		authenticate(){
			let {username,password} = this.getProperties('username','password');
			let identification =username;
			let  u = this.get('session').authenticate('authenticator:oauth2',identification,password).then(() =>{				
				window.location.href='/protected';
			}).catch((reason)=>{
				var error="";
				if(typeof reason.error == "object"){
					if(reason.error.password){
						error += "Debes digitar la contraseña";
					}
					if(reason.error.username){
						error += "Debes digitar el usuario ";
					}
				} else if(typeof reason.error == "string"){
					error = reason.error;
				}
				this.set('errorMessage',error);
			}); 
			
		},
		obtenerImage(){
			let {username} = this.getProperties('username');
			if(username != ''){
				var o = this;
				$.post( ENV.SERVER_API+"/api/auth/imagen_usuario", { "username": username}).done(function( data ) {
					if(data.fto_usro != null){
						$('#user_photo').attr('src',data.fto_usro);
						o.set('errorMessage',data.error);
					}else{
						$('#user_photo').attr('src', '/assets/img/login_user_image.png');
						o.set('errorMessage',data.error);
					}
				}).fail(function(data){	
					$('#user_photo').attr('src', '/assets/img/login_user_image.png');	
					o.set('errorMessage',data.responseJSON.error);
				});
			}else{
				$('#user_photo').attr('src', '/assets/img/login_user_image.png');
			}
			//verificar si la imagen es cargada de forma correcta sino se mantiene la imagen default
			var imgUser = $('#user_photo')[0];
			imgUser.onerror = function(){
				$('#user_photo').attr('src', '/assets/img/login_user_image.png');
			}
		}
	}
});
