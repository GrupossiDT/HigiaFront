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
		formdata.append('id_mnu_ge','176');
		formdata.append('id_undd_ngco',cookie_higia.id_undd_ngco);
		formdata.append('id_grpo_emprsrl',cookie_higia.id_grpo_emprsrl);
		return Ember.$.ajax({
			headers:{"Authorization": access_token},
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			data:formdata,
			url: ENV.SERVER_API+"/api/users/listar",
		}).then(function (result) {
			//var obj={};
			//obj["datos"]=result;
			var obj={"usuario":[]};

			var myModel = {"nmbre_usro":"","lgn":"","id":"","estdo":""};


			if(result.error){
				 obj["usuario"]["datos"]=myModel;
			}else {
					obj["usuario"]["datos"]=result;
			}

			var columns = [
				{"title": "Modificar","component": "editRow","editable": false},
				{"propertyName":"lgn","title" :"Usuario"},
				{"propertyName":"nmbre_usro","title" :"Nombre Completo"},
				{"propertyName":"estdo","title" :"Estado"},
				{"title": "Asignar Perfil","component": "addprfl","editable": false},
			];
			obj["usuario"]["columns"] = columns;
			obj["usuario"]["modelCreator"]= myModel;
			return obj;
		})
	}
});
