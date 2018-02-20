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
        message: 'Debes escribir el codigo de la pregunta'
      },
      dscrpcn:{
        required: true,
        message: 'Debes escribir la descripcion de la Pregunta'
      },
	}
  },
  actions:{

    save(){
      console.log("Hola mundo");
      var frmData=this.model[0];
      var formData = new FormData();

      this.send('validate_form_action', frmData);


      if(Object.keys(this.validationErrors).length > 0){

        return;
      }
      formData.append('cdgo', frmData.cdgo);
      formData.append('dscrpcn', frmData.dscrpcn);
	  formData.append('id_mnu_ge',"330");
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      Ember.$.ajax({
        data: formData,
		headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/preguntasSg/insertar_preguntasg',
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
          alert("aaa"+response.readyState);
        }
      });

    },

  }
});
