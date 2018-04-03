import EmberController from '@ember/controller';
import { inject } from '@ember/service';
import ENV from '../config/environment';
import $ from 'jquery';
export default EmberController.extend({
	session: inject('session'),
	init:function() {
		alert('apenas cargo papu...');
		if(this.get('session.isAuthenticated')){
			window.location.href='/protected';
		}
	},
	actions: {
		authenticate(){
			let {username,password} = this.getProperties('username','password');
			let identification =username;
			let  u = this.get('session').authenticate('authenticator:oauth2',identification,password).then(() =>{
				window.location.href='/protected';
			}).catch((reason)=>{
				console.log(reason);
				if(typeof reason.error == "object"){
					if(reason.error.password){
						$("#danger").html("Debes digitar la contraseña").fadeTo(5000, 500).slideUp(500, function(){
								$("#danger").slideUp(500);
						});
					}
					if(reason.error.username){
						$("#danger").html("Debes digitar el usuario ").fadeTo(5000, 500).slideUp(500, function(){
								$("#danger").slideUp(500);
						});
					}
					console.log(typeof reason.rerror);
				} else if(reason.error){
					$("#danger").html(reason.error).fadeTo(5000, 500).slideUp(500, function(){
							$("#danger").slideUp(500);
					});
				}
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
