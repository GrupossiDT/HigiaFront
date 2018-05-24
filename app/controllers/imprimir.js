import EmberController from '@ember/controller';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default EmberController.extend({
	session: inject('session'),
  init:function() {
    this._super(...arguments);
  },
	actions: {
		printData(){
			window.print();
			return true;
		},
		goBack(){
			history.back();
		}
	}
})
