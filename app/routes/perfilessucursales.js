import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { inject } from '@ember/service';
import $ from 'jquery';

export default Route.extend({
  session: inject('session'),
  queryParams: {
    id_lgn_ge: ''
  },
	model:function(params){
		let{access_token,cookie_higia} = this.get('session.data.authenticated');
    let ln_id_lgn_ge = params.id_lgn_ge;
    var formdata = new FormData();
  	formdata.append('id_lgn_ge',ln_id_lgn_ge);
		return Ember.$.ajax({
			headers:{"Authorization": access_token},
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			data:formdata,
			url: ENV.SERVER_API+"/api/perfiles/perfiles_sucursales",
		}).then(function (result) {
			let obj={"perfiles_sucursales":[]};
			var myModel = {"nmbre_scrsl":"",
                     "dscrpcn_prfl":"",
                     "estdo":"",
                     "id_lgn_prfl_scrsl":"",
                     "undds_ngcio":"",
                     "mrca_scrsl_dfcto":"",
                     "id_scrsl":"",
                     "id_prfl_une":"",
                     "id_frma_pgo_dfcto_une":"",
                     "id_cnl_rcdo_dfcto_une":"",
                     "mnto_rmblso_pac":"",
                     "gdgt_sgmnto_trsldo":"",
                     "cntrl_atrzcn":"",
                     "cntrl_cja_mnr":"",
                     "cntrl_cmprbnte":"",
                     "id_lgn_ge":"",
                     "nmbre_usro":"",
                     "id_undds_ngcio":""};
			if(result.error){
        console.log('error');
				 obj["perfiles_sucursales"]["datos"]=myModel;
			}else {
					obj["perfiles_sucursales"]["datos"]=result;
			}
      console.log(myModel);
			var columns = [{"title": "","component": "editRow","editable": false},
				{"propertyName":"nmbre_scrsl","title" :"Sucursal"},
				{"propertyName":"dscrpcn_prfl","title" :"Perfil"},
				{"propertyName":"undds_ngcio","title" :"Unidade Negocio"},
        {"propertyName":"mrca_scrsl_dfcto","title" :"Sucursal Defecto"},
        {"propertyName":"estdo","title" :"Estado"},
			];
			obj["perfiles_sucursales"]["columns"] = columns;
			obj["perfiles_sucursales"]["modelCreator"]= myModel;
			return obj;
		})
	}
});
