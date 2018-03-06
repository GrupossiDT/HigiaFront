import EmberController from '@ember/controller';
import { inject } from '@ember/service';
import ENV from '../config/environment';
export default EmberController.extend({
	session: inject('session'),
	init:function() {
		$('body').toggleClass("bodyapp");
		this._super(...arguments);
	},
});
