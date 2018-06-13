import Ember from 'ember';
import formValidation from 'ember-form-validation/mixins/form-validation';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Component from '@ember/component';
import {get} from '@ember/object';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default Ember.Component.extend(formValidation,{
  session: inject('session'),

  init:function(){
    this._super(...arguments);
        let{access_token,cookie_higia} = this.get('session.data.authenticated');
        var _this = this;
        let result =  $.ajax({
            type: "POST",
            url: ENV.SERVER_API+"/api/AdministracionTablasMaestras/UnidadesNegocio",
            data: { id_grpo_emprsrl:cookie_higia.id_grpo_emprsrl }
        }).done(function (result) {
            _this.set('UnddsNgcio',result);
      });
  },

  validate:{
    form:{
        id_undds_ngcio:{
          required: true,
          format: 'number',
          message: 'El Campo Unidad De Negocio Esta Sin Datos Seleccionados ',
          number: {min:1,minMessage: 'El Campo Unidad De Negocio Esta Sin Datos Seleccionados '}
        },
        id_scrsl:{
          required: true,
          format: 'number',
          message: 'El Campo Sucursal Esta Sin Datos Seleccionados',
          number: {min:1,minMessage: 'El Campo Sucursal Esta Sin Datos Seleccionados'}
        },
        id_prfl_une:{
          required: true,
          format: 'number',
          message: 'El Campo Perfil Esta Sin Datos Seleccionados',
          number: {min:1,minMessage: 'El Campo Perfil Esta Sin Datos Seleccionados'}
        },
    }
  },

  actions:{
		mostrar_ventana(data, event) {
      	this.set('mdlComponent', true);
  	},
    //marcar estado de los checkbox
    checkClick(name,value){
      this.set('model.'+name, !value);
    },
    //cambio de los combos con estado
    cambioEstado(name){
      var lb_estdo = $( "#"+name+" option:selected" ).val();
      this.set('model.'+name,lb_estdo);
    },


    update(){
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      var frmData  = this.model;
      var formData = new FormData();
      this.send('validate_form_action', frmData);
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }
      //asignacion de datos a variables
      formData.append('id',frmData.id_lgn_prfl_scrsl);
      formData.append('id_lgn_ge',frmData.id_lgn_ge);
      formData.append('id_undds_ngcio',frmData.id_undds_ngcio);
      formData.append('id_scrsl',frmData.id_scrsl);
      formData.append('id_prfl_une',frmData.id_prfl_une);
      formData.append('id_frma_pgo_dfcto_une',frmData.id_frma_pgo_dfcto_une);
      formData.append('id_cnl_rcdo_dfcto_une',frmData.id_cnl_rcdo_dfcto_une);
      formData.append('mrca_scrsl_dfcto',frmData.mrca_scrsl_dfcto=='ACTIVO');
      formData.append('cntrl_cmprbnte',frmData.cntrl_cmprbnte);
      formData.append('cntrl_cja_mnr',frmData.cntrl_cja_mnr);
      formData.append('cntrl_atrzcn',frmData.cntrl_atrzcn);
      formData.append('gdgt_sgmnto_trsldo',frmData.gdgt_sgmnto_trsldo);
      formData.append('mnto_rmblso_pac',frmData.mnto_rmblso_pac);
      formData.append('estdo', frmData.estdo=='ACTIVO');
      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+"/api/perfiles/actualizar_perfiles_sucursales",
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
      var _this = this;

      var formData = new FormData();
      this.send('validate_form_action', frmData);
      if(Object.keys(this.validationErrors).length > 0){
        return;
      }
      //asignacion de datos a variables
      var ln_id_lgn_ge =frmData.id_lgn_ge;
      formData.append('id_lgn_ge',frmData.id_lgn_ge);
      formData.append('id_undds_ngcio',frmData.id_undds_ngcio);
      formData.append('id_scrsl',frmData.id_scrsl);
      formData.append('id_prfl_une',frmData.id_prfl_une);
      formData.append('id_frma_pgo_dfcto_une',frmData.id_frma_pgo_dfcto_une);
      formData.append('id_cnl_rcdo_dfcto_une',frmData.id_cnl_rcdo_dfcto_une);
      formData.append('mrca_scrsl_dfcto',frmData.mrca_scrsl_dfcto=='ACTIVO');
      formData.append('cntrl_cmprbnte',frmData.cntrl_cmprbnte);
      formData.append('cntrl_cja_mnr',frmData.cntrl_cja_mnr);
      formData.append('cntrl_atrzcn',frmData.cntrl_atrzcn);
      formData.append('gdgt_sgmnto_trsldo',frmData.gdgt_sgmnto_trsldo);
      formData.append('mnto_rmblso_pac',frmData.mnto_rmblso_pac);
      formData.append('estdo', frmData.estdo=='ACTIVO');
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      Ember.$.ajax({
        data: formData,
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: ENV.SERVER_API+'/api/perfiles/crear_perfiles_sucursales'
      }).then((response)=> {
          if(typeof response == "object"){
            if(!response.error){
              var perfiles_sucursales={"nmbre_scrsl":$("#Scrsl option:selected").text(),
              "dscrpcn_prfl":$("#Prfl option:selected").text(),
              "undds_ngcio":$("#UnddsNgcio option:selected").text(),
              "mrca_scrsl_dfcto":$("#mrca_scrsl_dfcto option:selected").text(),
              "id_lgn_prfl_scrsl":response.id,
              "estdo":$("#estdo option:selected").text()};
              //limpiar datos delmodelo de creacion y actualizar el modelo de datos para que se muestren los creados
              var emptyModel ={"nmbre_scrsl":"","dscrpcn_prfl":"","estdo":"ACTIVO","id_lgn_prfl_scrsl":"","undds_ngcio":"","mrca_scrsl_dfcto":"ACTIVO",
                             "id_scrsl":"","id_prfl_une":"","id_frma_pgo_dfcto_une":"","id_cnl_rcdo_dfcto_une":"","mnto_rmblso_pac":"",
                             "gdgt_sgmnto_trsldo":"","cntrl_atrzcn":"","cntrl_cja_mnr":"","cntrl_cmprbnte":"","id_lgn_ge":ln_id_lgn_ge,
                             "nmbre_usro":"","id_undds_ngcio":""};
              if(! _this.parent.datos.length){//inserto datos creados
                var arrayPerfiles=[];
                arrayPerfiles.push(perfiles_sucursales);
                _this.set('parent.datos',arrayPerfiles);
              } else{
                _this.parent.datos.unshiftObject(perfiles_sucursales);
              }

              $("#success").html(response.success).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                  _this.set('model',emptyModel);//limpio modelo de creacion
                  $("#success").slideUp(ENV.TIME_IN_ALERT);
              });
            }else {
              $("#danger").html(response.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                  $("#danger").slideUp(ENV.TIME_IN_ALERT);
              });
            }
          }
        }).catch((response)=>{
          $("#danger").html(response.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
              $("#danger").slideUp(ENV.TIME_IN_ALERT);
          });
        });
    },
	}
});
