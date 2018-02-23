import Component from '@ember/component';
export default Component.extend({
  actions:{
		openmodal(actionName, record, event) {
			this.set('mdlComponentCrear', true);
		},
    closeModal(){
        this.set('mdlComponentCrear', false);
    }
	}
});
