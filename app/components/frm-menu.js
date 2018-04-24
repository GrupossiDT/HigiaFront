import Ember from 'ember';
import formValidation from 'ember-form-validation/mixins/form-validation';
import ENV from '../config/environment';
import { inject } from '@ember/service';
export default Ember.Component.extend(formValidation,{
 session: inject('session'),
  validate:{
    form:{
      ordn:{
        required: true,
        message: 'Debes escribir el orden de el menu'
      },
      dscrpcn:{
        required: true,
        message: 'Debes escribir la descripción de el Menu'
      }
    }
  },
  actions:{
    actualizar(){
      var _mymodel = this.model;
      var frmData=this.model;
      var formData = new FormData();
      console.log(frmData);
      this.send('validate_form_action', frmData);
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      formData.append('ln_id_mnu_ge',frmData.id);
      formData.append('ln_parent', frmData.parent);
      formData.append('lc_ordn', frmData.ordn);
      formData.append('lc_dscrpcn', frmData.dscrpcn);
      formData.append('lc_lnk', frmData.lnk);
      formData.append('lb_estdo', frmData.estdo == 'ACTIVO');
	    formData.append('id_mnu_ge_opt',"409");
      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/menu/actualizar'
      }).then((response)=>{
          if(typeof response == "object"){
            if(response.success){
              $("#success").html(response.success).fadeTo(3000, 500).slideUp(500, function(){
                  $("#success").slideUp(500);
              });
            }else if (response.error) {
                $("#danger").html(response.responseJSON.error).fadeTo(3000, 500).slideUp(500, function(){
                    $("#danger").slideUp(500);
                });
            }
          }else {
            $("#danger").html(response.responseJSON.error).fadeTo(3000, 500).slideUp(500, function(){
                $("#danger").slideUp(500);
            });
          }
        }).catch((response)=>{
          console.log(response);
          $("#danger").html(response.responseJSON.error).fadeTo(3000, 500).slideUp(500, function(){
              $("#danger").slideUp(500);
          });
      });
    },
    crear(){
      var frmData=this.model;
      var formData = new FormData();
      this.send('validate_form_action', frmData);
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      formData.append('ln_parent', frmData.parent);
      formData.append('lc_ordn', frmData.ordn);
      formData.append('lc_dscrpcn', frmData.dscrpcn);
      formData.append('lc_lnk', frmData.lnk);
      formData.append('id_mnu_ge_opt',"409");
      formData.append('id_grpo_emprsrl',cookie_higia.id_grpo_emprsrl);
      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/menu/crear'
      }).then((response)=> {
          if(typeof response == "object"){
            if(!response.error){
              var menu={"parent":frmData.parent,"ordn":frmData.ordn,"dscrpcn":frmData.dscrpcn,"lnk":frmData.lnk,"id":response.id,"estdo":'ACTIVO'};
              this.parent.unshiftObject(menu);
              $("#success").html(response.success).fadeTo(3000, 500).slideUp(500, function(){
                  $("#success").slideUp(500);
              });

            }else {
              $("#danger").html(response.responseJSON.error).fadeTo(3000, 500).slideUp(500, function(){
                  $("#danger").slideUp(500);
              });
            }
          }
        }).catch((response)=>{
          $("#danger").html(response.responseJSON.error).fadeTo(3000, 500).slideUp(500, function(){
              $("#danger").slideUp(500);
          });
        });
    },
    cambioEstado(){
      var lb_estdo = $( "#chg_estdo option:selected" ).val();
      this.set('model.estdo',lb_estdo);
    }
  }
});
