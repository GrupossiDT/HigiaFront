import Component from '@ember/component';
import {get} from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default Component.extend({
  session: inject('session'),
  actions:{
		mostrar_ventana(data, event) {
      	this.set('mdlComponent', true);
		},

    guardar(){

    }
	}
});
