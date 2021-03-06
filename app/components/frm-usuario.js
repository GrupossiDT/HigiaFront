import Ember from 'ember';
import formValidation from 'ember-form-validation/mixins/form-validation';
import ENV from '../config/environment';
import { inject } from '@ember/service';
export default Ember.Component.extend(formValidation,{
 session: inject('session'),
  validate:{
    form:{
      nmbre_usro:{
        required: true,
        message: 'Debes escribir el nombre de usuario'
      },
      lgn:{
        required: true,
        message: 'Debes escribir el login'
      },

    }
  },
  actions:{
    update(){
      var _mymodel = this.model;
      var frmData=this.model;
      var formData = new FormData();
      var file = this.$('#fl_imagen')[0].files[0];
      this.send('validate_form_action', frmData);
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }
    let{access_token,cookie_higia} = this.get('session.data.authenticated');
    formData.append('password', frmData.password);
    formData.append('nombre_usuario', frmData.nmbre_usro);
    formData.append('login', frmData.lgn);
    var ln_id_mnu_ge = getIdMenu();
    formData.append('id_mnu_ge',ln_id_mnu_ge);
    //model frmData.id equivale a id_login_ge de la tabla login_ge
    formData.append('id_login_ge',frmData.id);
    formData.append('id_grpo_emprsrl',cookie_higia.id_grpo_emprsrl);
    formData.append('estdo',frmData.estdo=='ACTIVO');
    if(file){
        formData.append('imge_pth', file);
    }

      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/users/actualizar',
      }).then((response)=>{
          if(typeof response == "object"){
            if(response.success){
              $("#success").html(response.success).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                  $("#success").slideUp(ENV.TIME_IN_ALERT);
              });
            }else if (response.error) {
                $("#danger").html(response.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                    $("#danger").slideUp(ENV.TIME_IN_ALERT);
                });
            }
          }else {
            $("#danger").html("Error de conexión").fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                $("#danger").slideUp(ENV.TIME_IN_ALERT);
            });
          }
        }).catch((response)=>{
          var error;
          if(response.responseJSON.error){
            error = response.responseJSON.error;
          }else{
            error="Error de conexión";
          }
          $("#danger").html(error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
              $("#danger").slideUp(ENV.TIME_IN_ALERT);
          });
      });
    },
    save(){
      var frmData=this.model;
      var formData = new FormData();
      var file = this.$('#fl_imagen')[0].files[0];
      this.send('validate_form_action', frmData);
      var _this = this;
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      formData.append('password', frmData.password);
      formData.append('nombre_usuario', frmData.nmbre_usro);
      formData.append('login', frmData.lgn);
      var ln_id_mnu_ge = getIdMenu();
      formData.append('id_mnu_ge',ln_id_mnu_ge);
      formData.append('id_grpo_emprsrl',cookie_higia.id_grpo_emprsrl);
      formData.append('estdo',frmData.estdo);
      if(file){
          formData.append('imge_pth', file);
      }

      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/users/crear',
      }).then((response)=> {

          if(typeof response == "object"){
            if(!response.error){
              var usuario={"nmbre_usro":frmData.nmbre_usro,"lgn":frmData.lgn,"id":response.id, "estdo":'ACTIVO'};
              this.parent.unshiftObject(usuario);
              $("#success").html(response.success).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                  $("#success").slideUp(ENV.TIME_IN_ALERT);
                  _this.set('model',{});
              });
            }else {
              $("#danger").html(response.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                  $("#danger").slideUp(ENV.TIME_IN_ALERT);
              });
            }
          }
        }).catch((response)=>{
          var resultado = '';
          var objeto = response.responseJSON.error;
          if(objeto.length>0){
            resultado = objeto;
          }else{
            for (var i in objeto){
              resultado += i+":"+objeto[i][0]+"\n";
            }
          }
          $("#danger").html(resultado).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
              $("#danger").slideUp(ENV.TIME_IN_ALERT);

          });
        });
    },
    cambioEstado(){
      var lb_estdo = $( "#estdo option:selected" ).val();
      this.set('model.estdo',lb_estdo);
    }
  }
});
