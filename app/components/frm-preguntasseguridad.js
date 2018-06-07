import Ember from 'ember';
import formValidation from 'ember-form-validation/mixins/form-validation';
import ENV from '../config/environment';
import { inject } from '@ember/service';
export default Ember.Component.extend(formValidation,{
  session: inject('session'),
  validate:{
    form:{
      id_prgnt_sgrdd_ge:{
        required: true,
        message: 'Debes seleccinar una pregunta',
      }
    }
  },
  actions:{
    actualizar(){
      var _mymodel = this.model;
      var frmData=this.model;
      var formData = new FormData();
      this.send('validate_form_action', frmData);
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }

      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      formData.append('ln_id_rspsta_prgnta_sgrdd', frmData.id);
      formData.append('lc_rspsta', frmData.rspsta);
      console.log('id pregunta seguridad'+$('#prgntsge').val());
      formData.append('ln_id_prgnt_sgrdd_ge', $('#prgntsge').val());
      formData.append('lb_estdo', frmData.estdo=='ACTIVO');
      var ln_id_mnu_ge = getIdMenu();
	    formData.append('id_mnu_ge',ln_id_mnu_ge);
      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/preguntasSg/actualizarpreguntapeguridad'
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
          $("#danger").html(response.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
              $("#danger").slideUp(ENV.TIME_IN_ALERT);
          });
      });
    },
    crear(){
      console.log('aqui js crear');
      var frmData=this.model;
      var formData = new FormData();
      this.send('validate_form_action', frmData);
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      formData.append('ln_id_rspsta_prgnta_sgrdd', frmData.id);
      formData.append('lc_rspsta', frmData.rspsta);
      formData.append('ln_id_prgnt_sgrdd_ge', $('#prgntsge').val());
      var ln_id_mnu_ge = getIdMenu();
      formData.append('id_mnu_ge',ln_id_mnu_ge);
      var lc_opcn_prgntsge = $('#prgntsge option:selected').text();
      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/preguntasSg/crearpreguntaseguridad'
      }).then((response)=> {
          if(typeof response == "object"){
            if(!response.error){
              var pregunta={"dscrpcn":lc_opcn_prgntsge,"id":response.id,"estdo":'ACTIVO'};
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
