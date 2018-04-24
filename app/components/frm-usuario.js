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
    formData.append('id_mnu_ge',"176");
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
console.log('aqui '+response);
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
            $("#danger").html("Error de conexión").fadeTo(3000, 500).slideUp(500, function(){
                $("#danger").slideUp(500);
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

          var resultado = '';
          var objeto = response.responseJSON.error;

          if(objeto.length>0){
            resultado = objeto;
          }else{
            for (var i in objeto){
              resultado += i+":"+objeto[i][0]+"\n";
            }
          }

          $("#danger").html(resultado).fadeTo(3000, 500).slideUp(500, function(){
              $("#danger").slideUp(500);

          });
        });
    },
    cambioEstado(){
      var lb_estdo = $( "#estdo option:selected" ).val();
      this.set('model.estdo',lb_estdo);
    }
  }
});
