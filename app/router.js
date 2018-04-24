import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('login');
  this.route('protected');
  this.route('usuarios');
  this.route('perfiles');
  this.route('preguntassg');
  this.route('menuprincipal');
  this.route('recuperarcontrasena');
  this.route('clavetemporal');
  this.route('cambiarcontrasena');
  this.route('cambiarcontrasenainterno');
});

export default Router;
