import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    openmodal(actionName, record, event) {
        this.set('mdlComponentCrear', true);
    },
    goBack(){
			history.back();
		}
  }

});
