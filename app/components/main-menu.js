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
		var guardando=false;
		var sobre_control = false;
		let{access_token,cookie_higia} =this.get('session.data.authenticated');
		var data = event.dataTransfer.getData('text');
		var element = document.getElementById(data)
		var id_mnu_ge = element.parentElement.id;
		var item = element.cloneNode(true);
		var lo_menu_favoritos = document.getElementById('menu-favorito');
		var li = document.createElement('li')
		var formdata = new FormData();
		formdata.append('id_mnu_ge',id_mnu_ge);
		$("#menu-favorito").hover(function(){
			sobre_control = true;
			if(!guardando){
				guardando=true;
				$.ajax({
					headers:{"Authorization": access_token},
					cache: false,
					contentType: false,
					processData: false,
					type: 'POST',
					url: ENV.SERVER_API+"/api/menu/agregar_favorito",
					data:formdata,
				}).then(function (result) {
					li.appendChild(item);
					lo_menu_favoritos.appendChild(li);
				}).done(function(){
					if(!sobre_control)
						guardando = false;
				})
			}
		},function(){
				sobre_control= false;
		}
	)

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
