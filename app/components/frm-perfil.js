import Ember from 'ember';
import formValidation from 'ember-form-validation/mixins/form-validation';
import ENV from '../config/environment';
import { inject } from '@ember/service';
import Component from '@ember/component';
export default Ember.Component.extend(formValidation,{
 session: inject('session'),
  validate:{
    form:{
      cdgo:{
        required: true,
        message: 'Debes escribir el código del perfil'
      },
      dscrpcn:{
        required: true,
        message: 'Debes escribir la descripción del perfil'
      }
    }
  },
  actions:{
    update(){
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      var frmData  = this.model;
      var formData = new FormData();
      console.log(frmData);
      this.send('validate_form_action', frmData);
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }
      //asignacion de datos a variables
      formData.append('id_prfl_une', frmData.id);
      formData.append('cdgo', frmData.cdgo);
      formData.append('dscrpcn', frmData.dscrpcn);
      formData.append('estdo', frmData.estdo=='ACTIVO');
      formData.append('id_mnu_ge','175');
      console.log(formData);
      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+"/api/perfiles/actualizar",
      }).then((response)=>{
          if(typeof response == "object"){
            if(response.success){
              $("#success").html(response.success).fadeTo(3000, 500).slideUp(500, function(){
                  $("#success").slideUp(500);
              });
            }else if (response.error) {
                $("#danger").html(response.error).fadeTo(3000, 500).slideUp(500, function(){
                    $("#danger").slideUp(500);
                });
            }
          }else {
            $("#success").html("Error de conexión").fadeTo(3000, 500).slideUp(500, function(){
                $("#success").slideUp(500);
            });
          }
        }).catch((response)=>{
          $("#danger").html("Error de conexión").fadeTo(3000, 500).slideUp(500, function(){
              $("#danger").slideUp(500);
          });
      });
    },
  }
})
