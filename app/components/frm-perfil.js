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
      this.send('validate_form_action', frmData);
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }
      //asignacion de datos a variables
      formData.append('id_prfl_une', frmData.id);
      formData.append('cdgo', frmData.cdgo);
      formData.append('dscrpcn', frmData.dscrpcn);
      formData.append('estdo', frmData.estdo=='ACTIVO');
      formData.append('id_undd_ngco',cookie_higia.id_undd_ngco);
      formData.append('id_mnu_ge','175');
      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+"/api/perfiles/actualizar",
      }).then((response)=>{
        console.log(typeof response)
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
            $("#danger").html("Error de conexión").fadeTo(3000, 500).slideUp(500, function(){
                $("#danger").slideUp(500);
            });
          }
        }).catch((response)=>{
          $("#danger").html(response.responseJSON.error).fadeTo(3000, 500).slideUp(500, function(){
              $("#danger").slideUp(500);
          });
      });
    },
    save(){
<<<<<<< HEAD
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      var frmData  = this.model;
=======
      var frmData=this.model;
>>>>>>> 49af9b7c584cc98fabfa8d03f8c407819a74e5ac
      var formData = new FormData();
      this.send('validate_form_action', frmData);
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }
<<<<<<< HEAD
      formData.append('id_undd_ngco',cookie_higia.id_undd_ngco);
      formData.append('cdgo', frmData.cdgo);
      formData.append('dscrpcn', frmData.dscrpcn);
      formData.append('id_mnu_ge',"175");
=======
      formData.append('cdgo', frmData.cdgo);
      formData.append('dscrpcn', frmData.dscrpcn);
      formData.append('id_mnu_ge',"175");
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      formData.append('id_undd_ngco',cookie_higia.id_undd_ngco);
>>>>>>> 49af9b7c584cc98fabfa8d03f8c407819a74e5ac
      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/perfiles/crear'
      }).then((response)=> {
<<<<<<< HEAD
          if(typeof response == "object"){
            if(!response.error){
              var datos={"cdgo":frmData.cdgo,"dscrpcn":frmData.dscrpcn,"id":response.id};
              this.parent.unshiftObject(datos);
=======
        console.log(response);
          if(typeof response == "object"){
            if(!response.error){
              var perfil={"cdgo":frmData.cdgo,"dscrpcn":frmData.dscrpcn,"id":response.id};
              this.parent.unshiftObject(perfil);
>>>>>>> 49af9b7c584cc98fabfa8d03f8c407819a74e5ac
              $("#success").html(response.success).fadeTo(3000, 500).slideUp(500, function(){
                  $("#success").slideUp(500);
              });
            }else {
              $("#danger").html(response.error).fadeTo(3000, 500).slideUp(500, function(){
                  $("#danger").slideUp(500);
              });
            }
          }
        }).catch((response)=>{
<<<<<<< HEAD
          $("#danger").html(response.responseJSON.error).fadeTo(3000, 500).slideUp(500, function(){
              $("#danger").slideUp(500);
          });
        });
    },
    cambioEstado(){
    	var lb_estdo = $( "#chg_estdo option:selected" ).val();
    	this.set('model.estdo',lb_estdo);
=======
          $("#danger").html(response.error).fadeTo(3000, 500).slideUp(500, function(){
              $("#danger").slideUp(500);
          });
        });
>>>>>>> 49af9b7c584cc98fabfa8d03f8c407819a74e5ac
    }
  }
})
