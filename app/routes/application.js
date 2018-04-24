import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from '../config/environment';
import { inject } from '@ember/service';
import $ from 'jquery';
export default Ember.Route.extend({
	session: inject('session'),
	model:function(){
		var isAuthenticated = this.get('session.isAuthenticated');
		if( isAuthenticated ){
			let{access_token,cookie_higia} = this.get('session.data.authenticated');
			let menu = $.ajax({
				headers:{"Authorization": access_token},
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				url: ENV.SERVER_API+"/api/auth/menu",
			}).then(function (result) {
				var items = CrearMenu(result);
				var obj ={};
				obj["menu"] = items["source"];
				obj["mfav"] = items["fav"];
				obj["user"]= cookie_higia;
				obj["url_fto_usro"] = ENV.SERVER_API+"/static/img/"+cookie_higia.fto_usro;
				return  obj;
			}).catch(function(error){
				return null;
			});
			return menu;
		}
		return null;
	},
});

function CrearMenu(data){
	var source = [];
	var items = [];
	var result ={};
	var favoritos=[];
	data.forEach(function(item){
		var label = item.text;
		var favorito = item.favorito == false ? null: item.favorito;
		var parentid = item.parentid == 0 ? null : item.parentid;
		var enlace = item.enlace == "" ? null : item.enlace;

		var id = item.id;
		var id_mnu_ge = item.id_mnu_ge;
		arrayMenu[enlace]={"id":id_mnu_ge};
		if(favorito){
			var item_favorito = { parentid: parentid, id:id, label: label, item: item, enlace:enlace };
			favoritos[favoritos.length] = item_favorito;
		}
		if (items[parentid]) {
			var item = { parentid: parentid, id:id, label: label, item: item,enlace:enlace };
			if (!items[parentid].items) {
				items[parentid].items = [];
			}
			items[parentid].items[items[parentid].items.length] = item;
			items[id] = item;
		}
		else {
			items[id] = { parentid: parentid, id:id, label: label, item: item,enlace:enlace };
			source[id] = items[id];
		}
	});
	result["fav"] =  favoritos;
	result["source"] = source;
  return result;
}

function buildUL(items) {
var stringmenu = "";
    items.forEach(function(obj){
    	if(obj.label){
			stringmenu +="<li><a href='#'>"+obj.label+"</a></li>";
    	}
    });
    return stringmenu;
}
