/*Variables Globales */
var arrayMenu={}; // llamada en application.js

/*Funcion que se ejecuta al cargar el docuemento cualquier
parte del body .
caso de uso ocultar menu y panel automaticamente*/
window.onload=function(){
	$( "body" ).click(function( e ) {
				mainMenu = document.getElementById("main-menu");
				rectsMenu = mainMenu.getBoundingClientRect();

				user_id = document.getElementById("user_id");
				rectsUserId = user_id.getBoundingClientRect();

				//cuando cerrar el menu
				if($("#main-menu").hasClass('showMenu')){
						if(e.target.id=="arrow-menu"){
							return;
						}


					 if( !(e.pageX<= rectsMenu.left +rectsMenu.width && e.pageX>= rectsMenu.left &&  e.pageY<= rectsMenu.top +rectsMenu.height && e.pageY>= rectsMenu.top) ){
						 $("#main-menu").removeClass("showMenu");
					 }
				}

				//cuando cerrar el panel
				if($("#user_id").hasClass('showConf')){
					if(e.target.id=="ic-conf"){
						return;
					}

					if( !(e.pageX<= rectsUserId.left +rectsUserId.width && e.pageX>= rectsUserId.left &&  e.pageY<= rectsUserId.top +rectsUserId.height && e.pageY>= rectsUserId.top) ){
						$("#user_id").removeClass("showConf");
					}
				}
		});
}

function userImgError(Obj){
	$(Obj).attr('src', '/assets/img/login_user_image.png');
}

/*Funcion que permite traer el id_mnu_ge del
enlace del menu principal de form directa
se define en application.js*/
function getIdMenu(){
	var path = window.location.pathname;
	var page = path.split("/").pop();
	return arrayMenu[page].id;
}
