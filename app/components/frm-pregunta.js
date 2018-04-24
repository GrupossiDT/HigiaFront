import Ember from 'ember';
import formValidation from 'ember-form-validation/mixins/form-validation';
import ENV from '../config/environment';
import { inject } from '@ember/service';
export default Ember.Component.extend(formValidation,{
 session: inject('session'),
  validate:{
    form:{
      cdgo:{
        required: true,
        message: 'Debes escribir el código de la Pregunta'
      },
      dscrpcn:{
        required: true,
        message: 'Debes escribir la descripción de la pregunta'
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
      formData.append('ln_id_prgnta_ge', frmData.id);
      formData.append('lc_cdgo', frmData.cdgo);
      formData.append('lc_dscrpcn', frmData.dscrpcn);
<<<<<<< HEAD
      formData.append('lb_estdo',frmData.estdo == 'ACTIVO');
	    formData.append('id_mnu_ge',"330");
=======
      formData.append('lb_estdo', frmData.estdo=='ACTIVO');
      var ln_id_mnu_ge = getIdMenu();
	    formData.append('id_mnu_ge',ln_id_mnu_ge);
>>>>>>> 900fdcd999e04c91627ce0ecdd91c7c77bb847b6
      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/preguntasSg/actualizar'
      }).then((response)=>{
          if(typeof response == "object"){
            if(response.success){
              $("#success").html(response.success).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                  $("#success").slideUp(ENV.TIME_IN_ALERT);
              });
            }else if (response.error) {
                $("#danger").html(response.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                    $("#danger").slideUp(ENV.TIME_IN_ALERT);
                });
            }
          }else {
            $("#danger").html(response.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                $("#danger").slideUp(ENV.TIME_IN_ALERT);
            });
          }
        }).catch((response)=>{
          console.log(response);
          $("#danger").html(response.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
              $("#danger").slideUp(ENV.TIME_IN_ALERT);
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
      formData.append('lc_cdgo', frmData.cdgo);
      formData.append('lc_dscrpcn', frmData.dscrpcn);
      var ln_id_mnu_ge = getIdMenu();
      formData.append('id_mnu_ge',ln_id_mnu_ge);
      formData.append('id_undd_ngco',cookie_higia.id_undd_ngco);
      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/preguntasSg/crear'
      }).then((response)=> {
          if(typeof response == "object"){
            if(!response.error){
              var pregunta={"cdgo":frmData.cdgo,"dscrpcn":frmData.dscrpcn,"id":response.id,"estdo":'ACTIVO'};
              this.parent.unshiftObject(pregunta);
              $("#success").html(response.success).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                  $("#success").slideUp(ENV.TIME_IN_ALERT);
              });

            }else {
              $("#danger").html(response.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                  $("#danger").slideUp(ENV.TIME_IN_ALERT);
              });
            }
          }
        }).catch((response)=>{
          $("#danger").html(response.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
              $("#danger").slideUp(ENV.TIME_IN_ALERT);
          });
        });
    },
    cambioEstado(){
      var lb_estdo = $( "#chg_estdo option:selected" ).val();
      this.set('model.estdo',lb_estdo);
    }
  }
});
