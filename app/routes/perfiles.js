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

		var	ln_id_mnu_ge = getIdMenu(this.routeName);
		formdata.append('id_mnu_ge',ln_id_mnu_ge);
	 	formdata.append('id_undd_ngco',cookie_higia.id_undd_ngco);
		return Ember.$.ajax({
			headers:{"Authorization": access_token},
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			data:formdata,
			url: ENV.SERVER_API+"/api/perfiles/listar",
		}).then(function (result) {
			let obj={"perfiles":[]};
			var myModel = {"cdgo":"","dscrpcn":"","id":"","estdo":""};
			if(result.error){
				 obj["perfiles"]["datos"]=myModel;
			}else {
					obj["perfiles"]["datos"]=result;
			}
			var columns = [{"title": "Modificar","component": "editRow","editable": false},
				{"propertyName":"cdgo","title" :"Código"},
				{"propertyName":"dscrpcn","title" :"Descripción"},
				{"propertyName":"estdo","title" :"Estado"},
				{"title": "Opciones","component": "addOpt","editable": false},
			];
			obj["perfiles"]["columns"] = columns;
			obj["perfiles"]["modelCreator"]= myModel;
			return obj;
		})
	}
});
