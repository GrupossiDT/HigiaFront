import Route from '@ember/routing/route';

export default Route.extend({
	model:function(){
		let pregunta = {};
		pregunta["cdgo"]="";
		pregunta["dscrpcn"]="";
		var modelo=[];
		modelo[0] = pregunta; 
		return modelo;
	}
	
});
