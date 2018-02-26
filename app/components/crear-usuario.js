import Ember from 'ember';
import formValidation from 'ember-form-validation/mixins/form-validation';
import ENV from '../config/environment';
import { inject } from '@ember/service';
export default Ember.Component.extend(formValidation,{
  session: inject('session'),
  validate:{
    form:{
      nombre_usuario:{
        required: true,
        message: 'Debes escribir el nombre de usuario'
      },
      login:{
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

    save(){
	  var file = this.$('#imge_pth')[0].files[0];
      var frmData=this.model[0];
      var formData = new FormData();

      this.send('validate_form_action', frmData);


      if(Object.keys(this.validationErrors).length > 0){

        return;
      }

    let{access_token,cookie_higia} = this.get('session.data.authenticated');

	  if(file){
      formData.append('imge_pth', file);
    }
    formData.append('password', frmData.password);
    formData.append('nombre_usuario', frmData.nombre_usuario);
    formData.append('login', frmData.login);
    formData.append('id_mnu_ge',"176");
    formData.append('id_grpo_emprsrl',cookie_higia.id_grpo_emprsrl);

    Ember.$.ajax({
        data: formData,
		    headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/users/insertar_usuario',
        success: function (response) {

          if(typeof response == "object"){
            if(response.error == "null"){
              alert("datos insertados correctamente");
            }else {
				alert(JSON.stringify(response.error));
			}
          }
        },
        error:function(response){
		  var errr = JSON.stringify(response.responseJSON.error);
      console.log(response);
          alert(errr);
        }
      });

    },

  }
});
