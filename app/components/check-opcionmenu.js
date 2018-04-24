import Component from '@ember/component';
import {get} from '@ember/object';
export default Component.extend({
   init(record) {
     this._super(...arguments);
   },
   actions: {
     clic_checkbox(event){
       console.log(this);
       var arrayCheckbox = $(".opcion_checkbox");
       var ln_tamano = this.column.data.length;
       var ln_seleccionado=0;
       arrayCheckbox.each(function() {
         if ($(this).is(":checked")) {
           ln_seleccionado = ln_seleccionado + 1;
         }
       });
       var text_button;
       if(ln_seleccionado != ln_tamano ){
         text_button="Todos";
       }else {
         text_button="Ninguno";
       }
       $('#text_toggle').html(text_button);
     }
   }

});
