import Component from '@ember/component';
import {get} from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default Component.extend({
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
      id:{
        required: true,
        message: 'Dato Obligatorio. Esta En Blanco O Vacio SeLeccione Datos'
      },
    }
  },

  actions:{
		mostrar_ventana(data, event) {
      	this.set('mdlComponent', true);
  	},

    cambioEstado(){
      //estado
      var lb_estdo = $( "#chg_estdo option:selected" ).val();
      this.set('model.estdo',lb_estdo);
      //cntrl_cja_mnr
      var lb_cntrl_cja_mnr = $( "#chg_estdo option:selected" ).val();
      this.set('model.cntrl_cja_mnr',lb_cntrl_cja_mnr);
      //cntrl_atrzcn
      var lb_cntrl_atrzcn = $( "#chg_estdo option:selected" ).val();
      this.set('model.cntrl_cja_mnr',lb_cntrl_atrzcn);
      //cntrl_cmprbnte
      var lb_cntrl_cmprbnte = $( "#chg_estdo option:selected" ).val();
      this.set('model.cntrl_cja_mnr',lb_cntrl_cmprbnte);
      //mrca_scrsl_dfcto
      var lb_mrca_scrsl_dfcto = $( "#chg_estdo option:selected" ).val();
      this.set('model.cntrl_cja_mnr',lb_mrca_scrsl_dfcto);
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
      formData.append('id',frmData.lgn_prfl_scrsl);
      formData.append('id_lgn_ge',frmData.id_lgn_ge);
      formData.append('id_scrsl',frmData.id_scrsl);
      formData.append('id_prfl_une',frmData.id_prfl_une);
      formData.append('mrca_scrsl_dfcto',frmData.mrca_scrsl_dfcto=='ACTIVO');
      formData.append('estdo', frmData.estdo=='ACTIVO');
      formData.append('cntrl_cmprbnte',frmData.cntrl_cmprbnte=='ACTIVO');
      formData.append('cntrl_cja_mnr',frmData.cntrl_cja_mnr=='ACTIVO');
      formData.append('id_frma_pgo_dfcto_une',frmData.id_frma_pgo_dfcto_une);
      formData.append('id_cnl_rcdo_dfcto_une',frmData.id_cnl_rcdo_dfcto_une);
      formData.append('cntrl_atrzcn',frmData.cntrl_atrzcn);
      formData.append('gdgt_sgmnto_trsldo',frmData.gdgt_sgmnto_trsldo=='ACTIVO');
      formData.append('mnto_rmblso_pac',frmData.mnto_rmblso_pac);
      console.log(formData);

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
          $("#danger").html(response.responseJSON.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
              $("#danger").slideUp(ENV.TIME_IN_ALERT);
          });
      });
    },

	}
});
