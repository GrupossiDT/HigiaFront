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
		event.preventDefault();
		var guardando=false;
		var sobre_control = false;
		let{access_token,cookie_higia} =this.get('session.data.authenticated');
		var data = event.dataTransfer.getData('text');
		var element = document.getElementById(data)
		var id_mnu_ge = element.parentElement.id;
		var formdata = new FormData();
		formdata.append('id_mnu_ge',id_mnu_ge);
		var _this = this;
		var key = element.parentElement.dataset.key;
		$("#menu-favorito").hover(()=>{
			var _this1 = _this;

			var item_a_crear =false;
			//busco el item a eliminar con el nombre del enlace
			for(var i=0;i < _this1.model.mfav.length;i++){
				if(_this1.model.mfav[i].enlace == key){
					item_a_crear = true;
					break;
				}
			}
			//si el item existe para prevenir multiples favoritos con el mismo key.
			if(item_a_crear){
			 	return;
			}

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
				}).then((result)=> {
					var source = arrayMenu[key];
					var _obj = {};
					_obj = {
						"enlace":source.descripcion,
						"id":source.parent_id,
						"id_mnu_ge":source.id,
						item:{
							actualizar:source.actualizar,
							anular:source.anular,
							crear:source.crear,
							enlace:source.descripcion,
							exportar:source.exportar,
							favorito:"true",
							id:source.parent_id,
							id_lgn_prfl_scrsl:cookie_higia.id_grpo_emprsrl,
							id_mnu_ge:source.id,
							imprimir:source.imprimir,
							parentid:source.parent,
							text:source.label
						},
						"parentid":source.parent,
						"label":source.label
					};

					_this.model.mfav.unshiftObject(_obj);
				}).done(function(){
					if(!sobre_control)
						guardando = false;
				})
			}
		},function(){
				sobre_control= false;
		});
  },
	borrar(){
		console.log('borrar sin refrescar');
	},
	actions:{
		borrarFavorito(id_mnu_ge,id,enlace){
			var _this = this;
			let{access_token,cookie_higia} = this.get('session.data.authenticated');
			var formdata = new FormData();
			formdata.append('id_mnu_ge',id_mnu_ge);
			$.ajax({
				headers:{"Authorization": access_token},
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				url: ENV.SERVER_API+"/api/menu/remover_favorito",
				data:formdata,
			}).then((result)=> {
				//inicialiso variable para index del item a eliminar
				var item_a_remover=-1;
				//busco el item a eliminar con el nombre del enlace
				for(var i=0;i < _this.model.mfav.length;i++){
					if(_this.model.mfav[i].enlace == enlace){
						item_a_remover = i;
						break;
					}
				}
				//si el item es positivo
				if(item_a_remover>=0){
					_this.model.mfav.removeAt(item_a_remover);
				}
			});

		},
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
