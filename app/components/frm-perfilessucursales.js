import Component from '@ember/component';
import {get} from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default Component.extend({
  session: inject('session'),

  init:function(){
    this._super(...arguments);
  },
  actions:{
		mostrar_ventana(data, event) {
      	this.set('mdlComponent', true);
        let{access_token,cookie_higia} = this.get('session.data.authenticated');
        var _this = this;
        let result =  $.ajax({
            type: "POST",
            url: ENV.SERVER_API+"/api/AdministracionTablasMaestras/UnidadesNegocio",
            data: { id_grpo_emprsrl:cookie_higia.id_grpo_emprsrl }
        }).done(function (result) {
            _this.set('modelUnddsNgcio',result);
            });
		},

    guardar(){

    }
	}
});
