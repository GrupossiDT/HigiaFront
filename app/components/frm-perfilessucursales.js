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
              var perfil={"cdgo":frmData.cdgo,"dscrpcn":frmData.dscrpcn,"id":response.id,"estdo":"ACTIVO"};
              this.parent.unshiftObject(perfil);
              $("#success").html(response.success).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
                  _this.set('model',{});
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
