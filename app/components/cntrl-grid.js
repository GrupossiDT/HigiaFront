import Component from '@ember/component';
export default Component.extend({
  init:function(){
    this._super(...arguments);
    var ls_route = this.router.currentRouteName;
    if(arrayMenu[ls_route]){
      var ln_array=this.set("permisos",arrayMenu[ls_route])
    }
  },
  actions:{
		openmodal(actionName, record, event) {
			this.set('mdlComponentCrear', true);
		},
    closeModal(){
        this.set('mdlComponentCrear', false);
    }
	}
});
