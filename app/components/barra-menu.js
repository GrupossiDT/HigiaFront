import Ember from 'ember';
import Component from '@ember/component';
import {get} from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default Component.extend(AuthenticatedRouteMixin,{
  router: Ember.inject.service('-routing'),
  actions:{
    openmodal(actionName, record, event) {
      this.set(actionName, true);
    },
    closeModal(){
        this.set('mdlComponentCrear', false);
        this.set('mdlExportar', false);
    },
    exportData(){
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      var formdata = new FormData();
      var ld_id_mnu_ge = getIdMenu(this.route);
      formdata.append('id_mnu_ge',ld_id_mnu_ge);
      Ember.$.ajax({
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        data:formdata,
        url: ENV.SERVER_API+"/api/exportar",
      }).then((result)=>{

      })
    },
    printData(){
      this.set('session.data.imprimir',this.modelImprimir);
      this.get('router').transitionTo('imprimir');
    }
  }
});
