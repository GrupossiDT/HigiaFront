window.onload=function(){
	$( "body" ).click(function( event ) {
  	console.log(event.target.id);
		});
}

function userImgError(Obj){
	$(Obj).attr('src', '/assets/img/login_user_image.png');
}
