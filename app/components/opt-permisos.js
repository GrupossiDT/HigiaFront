import Component from '@ember/component';
import {get} from '@ember/object';
import { inject } from '@ember/service';
export default Component.extend({
  session: inject('session'),
    init:function() {
    this._super(...arguments);
    let text_estado = "Seleccionar todos";

    if( this.record.crar &&
        this.record.actlzr &&
        this.record.anlr &&
        this.record.exprtr &&
        this.record.imprmr ){
          text_estado="Borrar seleccion";

    }
    console.log(text_estado);
    console.log("#all_"+this.record.id_mnu);
    this.set('record.text_all',text_estado );

  },
  actions: {
    guardarEnRegistro(obj){
      var ln_accion = $(obj.target).data("obj");
      var element;
      var _obj;
      switch (ln_accion) {
        case "crear":
          element = this.record.crar;
          _obj =  'record.crar';
          break;

        case "actualizar":
          element = this.record.actlzr;
          _obj =  'record.actlzr';
          break;

        case "anular":
          element = this.record.anlr;
          _obj =  'record.anlr';
          break;

        case "exportar":
          element = this.record.exprtr;
          _obj =  'record.exprtr';
          break;

        case "imprimir":
          element = this.record.imprmr;
          _obj =  'record.imprmr';
          break;

      }
      this.set(_obj ,!element);
    },
    toggle_seleccion_permisos(){
      let estado = true;
      if( this.record.crar &&
          this.record.actlzr &&
          this.record.anlr &&
          this.record.exprtr &&
          this.record.imprmr ){
            estado = false;
      }
      this.set('record.crar', estado);
      this.set('record.actlzr', estado);
      this.set('record.anlr', estado);
      this.set('record.exprtr', estado);
      this.set('record.imprmr', estado);

      if(estado){
        this.set('record.text_all',"Borrar selección");
      }else{
        this.set('record.text_all',"Seleccionar todos");
      }
    },

  }
});
