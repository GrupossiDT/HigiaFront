import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject } from '@ember/service';
const Router = EmberRouter.extend({
  session: inject('session'),
  paso:null,
  location: config.locationType,
  rootURL: config.rootURL,
  didTransition:function(){
    this._super(...arguments);
    let{access_token,cookie_higia} = this.get('session.data.authenticated');
    if(this.currentRouteName!='cambiarcontrasenainterno' && cookie_higia.cmbo_cntrsna){
      if (cookie_higia.cmbo_cntrsna){
        //console.log("did",Date.now());
        //window.location.href='/cambiarcontrasenainterno';
      }
    }
  },
  willTransition:function(transition){
    console.log(Date.now());
  }
});

Router.map(function() {
  this.route('login');
  this.route('protected');
  this.route('usuarios');
  this.route('perfiles');
  this.route('contratos');
  this.route('preguntassg');
  this.route('menuprincipal');
  this.route('recuperarcontrasena');
  this.route('clavetemporal');
  this.route('cambiarcontrasena');
  this.route('cambiarcontrasenainterno');
  this.route('imprimir');
  this.route('perfilessucursales');
  this.route('preguntasseguridad');
  this.route('responderpregunta');
});

export default Router;
