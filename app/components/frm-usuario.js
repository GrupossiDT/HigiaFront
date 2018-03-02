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
      password:{
        required:true,
        message:'Debes escribir la contraseña. Debe tener al menos 8 caracteres e incluir 1 letra mayúscula, 1 letra minúscula y 1 número',
        format:'password'
      }
    }
  },
  actions:{
    update(){
      var _mymodel = this.model;
      var frmData=this.model;
      var formData = new FormData();
      var file = this.$('#fl_imagen')[0].files[0];
      console.log(frmData);
      this.send('validate_form_action', frmData);
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }
    let{access_token,cookie_higia} = this.get('session.data.authenticated');
    formData.append('password', frmData.password);
    formData.append('nombre_usuario', frmData.nmbre_usro);
    formData.append('login', frmData.lgn);
    formData.append('id_mnu_ge',"176");
    //model frmData.id equivale a id_login_ge de la tabla login_ge
    formData.append('id_login_ge',frmData.id);
    formData.append('id_grpo_emprsrl',cookie_higia.id_grpo_emprsrl);
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
    save(){
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
      formData.append('id_mnu_ge',"176");
      formData.append('id_grpo_emprsrl',cookie_higia.id_grpo_emprsrl);
      formData.append('estado',frmData.estado);
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
              console.log('AQUI ENTRO!');
              console.log(frmData);
              var usuario={"nmbre_usro":frmData.nmbre_usro,"lgn":frmData.lgn,"id":response.id, "estdo":frmData.estado};
              this.parent.unshiftObject(usuario);
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
          console.log(response.responseJSON.error);
          $("#danger").html(response.responseJSON.error).fadeTo(3000, 500).slideUp(500, function(){
              $("#danger").slideUp(500);
              console.log('hello word');
          });
        });
    }
  }
});
