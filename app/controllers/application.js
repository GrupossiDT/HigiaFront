import EmberController from '@ember/controller';
import { inject } from '@ember/service';
export default EmberController.extend({
	session: inject('session'),
});