import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from '../config/environment';
import { inject } from '@ember/service';
export default OAuth2PasswordGrant.extend({
	serverTokenEndpoint: ENV.SERVER_API +"/api/auth/login",
	session: inject('session'),
	makeRequest: function(url,obj) {
		return Ember.$.ajax({
		  url:         this.serverTokenEndpoint,
		  type:        'POST',
		  data:         {grant_type: "password", username: obj.username, password: obj.password},
		  dataType:    'json',
		  contentType: 'application/x-www-form-urlencoded',

		}).then((response,textStatus, xhr)=>{
			this.set('session.store.cookie-higia', response["cookie-higia"]);
			return response;
		}).catch((reason)=> {
			return reason;
		});
  },
	_refreshToken(){
		
	}

});
