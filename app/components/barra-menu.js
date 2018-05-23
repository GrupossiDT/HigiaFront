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
      var type_download;
      var option = $("#type_download").val();
      var lo_data = this.attrs.modelExportar.value;
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      var formData = new FormData();
      var ld_id_mnu_ge = getIdMenu(this.route);

      //carga de parametros
      lo_data.params.forEach(function(entry,key){
        for(var k in entry){
          formData.append(k,entry[k]);
        }
      });

      let url = lo_data.url+"_"+option;
      return fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': access_token
        },
        body: formData
      }).then(function(resp) {
        return resp.blob();
      }).then(function(blob) {
        download(blob,'usuarios.'+option);
      });
    },
    printData(){
      this.set('session.data.imprimir',this.modelImprimir);
      this.get('router').transitionTo('imprimir');
    }
  }
});
