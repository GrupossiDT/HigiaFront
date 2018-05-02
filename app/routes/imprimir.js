import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import ENV from '../config/environment'
export default Route.extend({
  session: inject('session'),
  model:function(){
      let mdl = this.get('session.data.imprimir');
      var tmpColumns=[];
      mdl.columns.forEach(function(e,k){
      	var isComponent = false;
      	Object.keys(e).forEach(function(m){
      		if(m=='component'){
      			isComponent=true;
              }
      	});
      	if(!isComponent){
      		tmpColumns.push(e);
          }
      });
      var newModel=[];
      newModel.columns = tmpColumns;
      newModel.datos = mdl.datos;
      console.log(mdl.columns,mdl.datos);
      return newModel;
  }
});
