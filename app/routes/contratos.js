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
		console.log(cookie_higia);
		formdata.append('id_mnu_ge',getIdMenu());
		formdata.append('id_scrsl',cookie_higia.id_scrsl);
		formdata.append('id_undd_ngco',cookie_higia.id_undd_ngco);

		return Ember.$.ajax({
			headers:{"Authorization": access_token},
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			data:formdata,
			url: ENV.SERVER_API+"/api/Contratos/listar",
		}).then(function (result) {
			var obj={"contratos":[]};
			var myModel = {"cnsctvo_cntrto":"","nmbre_rzn_scl":"","id_cntrts":""};
			if(result.error){
				 obj["contratos"]["datos"]=myModel;
			}else {
					obj["contratos"]["datos"]=result;
			}
			var columns = [
				{"title": "Modificar","component": "editRow","editable": false},
				{"propertyName":"cnsctvo_cntrto","title" :"Consecutivo Contrato"},
				{"propertyName":"nmbre_rzn_scl","title" :"Nombre  Razon Social"},
			];
			obj["contratos"]["columns"] = columns;
			obj["contratos"]["modelCreator"]= myModel;
			return obj;
		})
	}
});
