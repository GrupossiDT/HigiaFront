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
		formdata.append('id_mnu_ge_opt','409');
		formdata.append('id_undd_ngco',cookie_higia.id_undd_ngco);
		formdata.append('id_grpo_emprsrl',cookie_higia.id_grpo_emprsrl);
		return Ember.$.ajax({
			headers:{"Authorization": access_token},
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			data:formdata,
			url: ENV.SERVER_API+"/api/menu/listar",
		}).then(function (result) {
			//var obj={};
			//obj["datos"]=result;
			var obj={"menu":[]};
			var myModel = {"ordn":"","dscrpcn":"","id":"","lnk":"","estdo":""};
			if(result.error){
				 obj["menu"]["datos"]=myModel;
			}else {
					obj["menu"]["datos"]=result;
			}

			var columns = [{"propertyName":"ordn","title" :"Orden"},
				{"propertyName":"dscrpcn","title" :"Descripción"},
        {"propertyName":"lnk","title" :"Link"},
				{"propertyName":"estdo","title" :"Estado"},
				{"title": "Modificar","component": "editRow","editable": false},
			];
			obj["menu"]["columns"] = columns;
			obj["menu"]["modelCreator"]= myModel;
			return obj;
		})
	}
});
