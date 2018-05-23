import Component from '@ember/component';
import { inject } from '@ember/service';
import ENV from '../config/environment';
import $ from 'jquery';
export default Component.extend({
	session: inject('session'),
	actions:{
		cambiarcontrasena(){
				window.location.href='/cambiarcontrasenainterno';
		},
		logout(){
			var _this = this;
			let{access_token,cookie_higia} = this.get('session.data.authenticated');
			$.ajax({
				headers:{"Authorization": access_token},
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				url: ENV.SERVER_API+"/api/auth/logout",
			}).then(function (result) {
				if(result.success == "BYE" ){
					_this.get('session').invalidate();
					window.location.href='/login';
				}
			})
		},
		showMenu(){
			$('#main-menu').toggleClass("showMenu");
		},
		showConf(){
			$('#user_id').toggleClass("showConf");
		}
	}
});
