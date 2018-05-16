import Component from '@ember/component';
import { inject } from '@ember/service';
import ENV from '../config/environment';
import $ from 'jquery';
export default Component.extend({
	session: inject('session'),
	classNames        : [ 'draggableDropzone' ],
  classNameBindings : [ 'dragClass' ],
  dragClass         : 'deactivated',
	dragLeave(event) {
    event.preventDefault();
  },

  dragOver(event) {
    event.preventDefault();
  },

  drop(event) {
		//TODO:guardar el cambio en base de datos
    var data = event.dataTransfer.getData('text');
		var element = document.getElementById(data)
		var item = element.cloneNode(true);
		var li = document.createElement('li')
		var lo_menu_favoritos = document.getElementById('menu-favorito');
		li.appendChild(item);
		lo_menu_favoritos.appendChild(li);
  },
	actions:{
		logout(){
			var _this = this;
			let{access_token,cookie_higia} = this.get('session.data.authenticated');
			$.ajax({
				headers:{"Authorization": access_token},
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				url: ENV.SERVER_API+"/api/auth/logout",
			}).then(function (result) {
				if(result.success == "BYE" ){
					_this.get('session').invalidate();
					window.location.href='/login';
				}
			})
		},
		showMenu(){
			$('#main-menu').toggleClass("showMenu");
		},
		showConf(){
			$('#user_id').toggleClass("showConf");
		},
	}
});
