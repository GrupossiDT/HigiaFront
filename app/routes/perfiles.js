import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { inject } from '@ember/service';
import $ from 'jquery';

export default Route.extend({
	session: inject('session'),
	model:function(){
		let{access_token,cookie_higia} = this.get('session.data.authenticated');
		var formdata = new FormData();
		formdata.append('id_mnu_ge','175');
		formdata.append('id_undd_ngco',cookie_higia.id_undd_ngco);
		return Ember.$.ajax({
			headers:{"Authorization": access_token},
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			data:formdata,
			url: ENV.SERVER_API+"/api/perfiles/ListarPerfiles",
		}).then(function (result) {
			var obj={};
			obj["datos"]=result;
			var columns = [{"propertyName":"cdgo","title" :"Código"},
				{"propertyName":"dscrpcn","title" :"Descripción"},
				{"propertyName":"estdo","title" :"Estado"},
				{"title": "Modificar","component": "editRow","editable": false},
			];
			obj["columns"] = columns;
			return obj;
		})
	}
});
