import Component from '@ember/component';
import {get} from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default Component.extend({
  session: inject('session'),
  actions:{
		mostrar_ventana(data, event) {
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
  		var formdata = new FormData();
  		formdata.append('id_mnu_ge','175');
  		formdata.append('id_undd_ngco',cookie_higia.id_undd_ngco);
  		formdata.append('id_prfl_une',data.id);
      Ember.$.ajax({
  			headers:{"Authorization": access_token},
  			cache: false,
  			contentType: false,
  			processData: false,
  			type: 'POST',
  			data:formdata,
  			url: ENV.SERVER_API+"/api/perfiles/obtenerOpcionesperfil",
  		}).then((result)=>{
  			var obj={"opcion":[]};
  			obj["opcion"]["datos"]=result;

  			var columns = [
          {"title": "Activo","component": "editOpt","editable": false},
          {"propertyName":"ordn","title" :"Orden"},
  				{"propertyName":"text","title" :"Descripción"},
          {"title": "Permisos","component": "editPrmss","editable": false},
  			];
  			obj["opcion"]["columns"] = columns;
        var seleccionado = obj["opcion"]["datos"];
        var ln_total_seleccionado=0;
        seleccionado.forEach(function(entry){
          if(!entry.seleccionado){
            return
          }
          ln_total_seleccionado++;
        });

        if(seleccionado.length == ln_total_seleccionado){
          obj["text_select"] = "Ninguno"
        }else{
          obj["text_select"] = "Todos"
        }
        this.set('model',obj);
  			this.set('mdlComponent', true);
  		});
		},
    toggle_seleccion(data,event){
      var limit=this.model.opcion.datos.length;
      var ln_seleccionado=0;

      this.model.opcion.datos.forEach(function(entry){
          if(entry.seleccionado==false){
            return;
          }
          ln_seleccionado = ln_seleccionado + 1;
      });

      var lb_value = !(limit==ln_seleccionado);

      for(var i=0;i<limit;i++){
        var item = this.get('model.opcion.datos').objectAt(i);
        Ember.set(item, "seleccionado", lb_value);
      }
      var text_button = lb_value ==true ? 'Ninguno' :'Todos';
      $('#text_toggle').html(text_button);
    },
    guardar(){
      if(this.record.estdo == "ACTIVO"){
        var arraySeleccion=[];
        var arrayPermisos=[];
        this.model.opcion.datos.forEach(function(entry){

          var tmpval={"id_mnu":entry['id_mnu'],
                      "id_prfl_une_mnu":entry['id_prfl_une_mnu'],
                      "seleccionado":entry['seleccionado']
          };

          var tmpval2={"id_prfl_une_mnu":entry['id_prfl_une_mnu'],
                        "id_mnu":entry['id_mnu'],
                        "id_crar":entry['id_crar'],
                  			"crar":entry['crar'],
                  			"id_act":entry['id_act'],
                  			"actlzr":entry['actlzr'],
                  			"id_anlr":entry['id_anlr'],
                  			"anlr":entry['anlr'],
                  			"id_imprmr":entry['id_imprmr'],
                  			"imprmr":entry['imprmr'],
                  			"id_exprtr":entry['id_exprtr'],
                  			"exprtr":entry['exprtr']
          };

          if( entry['crar'] !=null ||
              entry['actlzr'] !=null ||
              entry['anlr'] !=null ||
              entry['imprmr'] !=null ||
              entry['exprtr'] !=null
          ){
            arrayPermisos.push(tmpval2);
          }

          arraySeleccion.push(tmpval);
        });

        var ls_data = JSON.stringify(arraySeleccion);
        var ls_data_permisos = JSON.stringify(arrayPermisos);

        let{access_token,cookie_higia} = this.get('session.data.authenticated');
    		var formdata = new FormData();
    		formdata.append('id_mnu_ge','175');
        formdata.append('id_undd_ngco',cookie_higia.id_undd_ngco);
        formdata.append('ls_data',ls_data);
        formdata.append('ls_data_permisos',ls_data_permisos);
        formdata.append('id_perfil_une',this.record.id);
        Ember.$.ajax({
    			headers:{"Authorization": access_token},
    			cache: false,
    			contentType: false,
    			processData: false,
    			type: 'POST',
    			data:formdata,
    			url: ENV.SERVER_API+"/api/perfiles/gestionPermisos",
    		}).then((result)=>{
          if(result.success=="OK"){
            alert("Se guardaron los cambios");
          }else{
            alert("No se pudo guardar");
            //TODO:verificar como hacer roolback
            this.record.rollbackAttributes();
          }
        });
      }else{
        alert("Solo se pueden modificar perfiles activos");
      }
    }
	}
});
