import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from '../config/environment';
import { inject } from '@ember/service';
export default Ember.Route.extend(AuthenticatedRouteMixin,{
	session: inject('session'),	
	queryParams: {
        id: '27',
    },
	model:function(para){
		var id = '15';
		
		var isAuthenticated = this.get('session.isAuthenticated');
		
		if( isAuthenticated ){
			var formData = new FormData(); 
			formData.append('id_prgnta_ge',id);
			formData.append('id_mnu_ge','799');
			let{access_token,cookie_higia} = this.get('session.data.authenticated');
			let respond = $.ajax({
				data:formData,
				headers:{"Authorization": access_token},
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				url: ENV.SERVER_API+"/api/preguntasSg/listar_preguntasg",
			}).then(function (result) {
				return  result[0];
			}).catch(function(error){
				return error;
			});
			return respond;
		}
		return null;
	}
})