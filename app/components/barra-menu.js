import Ember from 'ember';
import Component from '@ember/component';
import {get} from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default Component.extend(AuthenticatedRouteMixin,{
  router: Ember.inject.service('-routing'),
  actions:{
    openmodal(actionName, record, event) {
      this.set(actionName, true);
    },
    closeModal(){
        this.set('mdlComponentCrear', false);
        this.set('mdlExportar', false);
    },
    exportData(){
      let{access_token,cookie_higia} = this.get('session.data.authenticated');
      var formdata = new FormData();
      var ld_id_mnu_ge = getIdMenu(this.route);
      formdata.append("id_mnu_ge",ld_id_mnu_ge);
      /*
      // Use XMLHttpRequest instead of Jquery $ajax
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          var a;
          if (xhttp.readyState === 4 && xhttp.status === 200) {
              // Trick for making downloadable link
              a = document.createElement('a');
              a.href = window.URL.createObjectURL(xhttp.response);
              // Give filename you wish to download
              a.download = "test-file.csv";
              a.style.display = 'none';
              document.body.appendChild(a);
              a.click();
          }
      };
      // Post data to URL which handles post request
      xhttp.open("POST", ENV.SERVER_API+"/api/users/descarga_csv");
      xhttp.setRequestHeader("Accept-Encoding", "UTF-8");
      xhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xhttp.setRequestHeader("Authorization",access_token);
      // You should set responseType as blob for binary responses
      //xhttp.responseType = 'blob';
      xhttp.send(formdata);

      */

      Ember.$.ajax({
        headers:{"Authorization": access_token},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        data:formdata,
        url: ENV.SERVER_API+"/api/users/descarga_csv",
      }).then((result)=>{
        var OpenWindow = window.open('mypage.html','_blank','width=335,height=330,resizable=1');
        //OpenWindow.writeHead(200, {'Content-Disposition': 'attachment;filename=rpt.csv' });
        OpenWindow.document.write(result);
      });

    },
    printData(){
      this.set('session.data.imprimir',this.modelImprimir);
      this.get('router').transitionTo('imprimir');
    }
  }
});
