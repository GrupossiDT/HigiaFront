import Ember from 'ember';
import Component from '@ember/component';
import ENV from '../config/environment';
import { inject } from '@ember/service';
export default Component.extend({

    init() {
      this._super(...arguments);
      arrayComponents[this.tagid]=this;
      if (this.parent || this.main){
        var _this = this;
        var lo_data =JSON.parse(_this.get('data'));
        let result =  $.ajax({
          type: "POST",
          url: ENV.SERVER_API+_this.get('url'),
          data: lo_data,
        }).done(function (result) {
          _this.set('model',result);
        });
      }
    },


    actions:{
      change(){
        var arraySelect=$(".select_higia");
        console.log(this);
        var _this = this;
        var i;
        for(i=0; i<arraySelect.length;i++){//recorro todos mis select
          var prnt = $(arraySelect[i]).data("parent");

          if( prnt == _this["tagid"]){//verifico si el que cambio es padre y modifico al hijo

             var hijo = arraySelect[i];
             var nombre_hijo = $(hijo)[0].id;
             //console.log("soy => "+nombre_hijo, " y mi papa es => "+prnt);
             var component_hijo = arrayComponents[nombre_hijo];
             //console.log(component_hijo);
             //inicio cambio del hijo
             var lo_data1;
             var lo_data =JSON.parse(component_hijo.data);
             Object.keys(lo_data).forEach(function(entry,key){
               //console.log(key);
               //console.log(entry);

              	if( entry == component_hijo.cmporlcn ){
              		 lo_data[entry]=$("#"+prnt).val();
                   component_hijo.set('data','{"'+ entry +'":"' + $("#"+prnt).val() + '"}');

                   if(_this.externalSelect){
                     _this.set("externalModel."+_this.externalSelect,$("#"+prnt).val());
                   }
                   //_this.externalModel.set(_this.name,$("#"+prnt).val());
                   lo_data1 =JSON.parse(component_hijo.data);
                   //console.log(component_hijo.get('data'));
                  }
              });
            //refresco y traigo los valores
             let result =  $.ajax({
               type: "POST",
               url: ENV.SERVER_API+component_hijo.url,
               data: lo_data1,
             }).then( (result)=> {
               component_hijo.set('model',result);
              // _this = component_hijo;
               component_hijo.sendAction('change');
               setTimeout(function(){
                 $('#'+component_hijo.tagid).change();
               },10);
             });
          }
        }
      },
    }
});
