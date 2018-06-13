import Ember from 'ember';
import Component from '@ember/component';
import ENV from '../config/environment';
import { inject } from '@ember/service';
export default Component.extend({
session: inject('session'),
  init() {
     this._super(...arguments);
     let{access_token,cookie_higia} = this.get('session.data.authenticated');
     arrayComponents[this.tagid]=this;
     if (this.parent || this.main) {
       var _this = this;
       var lo_data =JSON.parse(_this.get('data'));
       let result =  $.ajax({
        headers:{"Authorization": access_token},
        type: "POST",
        url: ENV.SERVER_API+_this.get('url'),
        data: lo_data,
       }).done(function (result) {

        _this.set('model',result);
       });
     }
   },

  actions:{
     change(tagid){
       //nombre del campo del dom por donde estoy
       this.set("externalModel."+arrayComponents[tagid].externalSelect,$("#"+tagid).val());
       Object.keys(arrayComponents).forEach((entry)=>{
         var current = arrayComponents[entry];
         if(current.tagparent){
           if(current.tagparent == tagid){
             //console.log(current.tagparent,current.tagid);
             var ln_tagid = current.tagid;
             //CAMBIAR EL DATA
             if(arrayComponents[ln_tagid].data){
               var strData = arrayComponents[ln_tagid].data;
               var OBJ = JSON.parse(strData);
               var cmporlcn = current.cmporlcn;
               OBJ[cmporlcn] = $("#"+tagid).val();
               current.data = JSON.stringify(OBJ);
               current.send('loadCmbo',current,OBJ);
             }
             current.send('change',ln_tagid);
           }
         }
       });
     },
     loadCmbo(component,Obj){
       var result =  $.ajax({
        type: "POST",
        url: ENV.SERVER_API+component.url,
        data: Obj,
      }).then( (result)=> {
        component.set('model',result);
      })
     }
    }
});
