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
		 return $.ajax({
			headers:{"Authorization": access_token},
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			data:formdata,
			url: ENV.SERVER_API+"/api/preguntasSg/listar",
		}).then(function (result) {
			var obj={"pregunta":[]};
			var myModel = {"cdgo":"","dscrpcn":"","id":"","estdo":""};
			if(result.error){
				 obj["pregunta"]["datos"]=myModel;
			}else {
					obj["pregunta"]["datos"]=result;
			}

			var columns = [{"propertyName":"cdgo","title" :"Código"},
				{"propertyName":"dscrpcn","title" :"Descripción"},
				{"propertyName":"estdo","title" :"Estado"},
				{"title": "Modificar","component": "editRow","editable": false},
			];
			obj["pregunta"]["columns"] = columns;
			obj["pregunta"]["modelCreator"]= myModel;
			return obj;
		})
	}
});
