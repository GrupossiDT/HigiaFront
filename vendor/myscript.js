/*Variables Globales */
var arrayMenu={}; // llamada en application.js

var arrayComponents={};//variable usada para traer elementos del select

/*Funcion que se ejecuta al cargar el docuemento cualquier
parte del body .
caso de uso ocultar menu y panel automaticamente*/
window.onload=function(){
$( "body" ).click(function( e ) {
		mainMenu = document.getElementById("main-menu");
		if(mainMenu){
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
	}
});
}

//precargador general.
//se modifica ajaxSetup para que todos los llamados AJAX tengan un
//indicador de precarga
var iAjx =0;
var loading=null;
jQuery.ajaxSetup({
beforeSend: function() {
		iAjx++;
		var preloading = document.getElementById("preloading");
		if(!preloading){
			var body = document.body;
			loading = document.createElement('div');
			loading.id="preloading";
			loading.style.width="100px";
			loading.style.height="40px";
			loading.style.position="fixed";
			loading.style.top="50%";
			loading.style.left="50%";
			loading.innerHTML="Espere...";
			loading.style.zIndex="99";
			loading.style.backgroundColor="#DDD";
			loading.style.boder="1px solid #000";
			loading.style.boderRadius="20px";
			loading.style.textAlign="center";
			loading.style.lineHeight="40px";
			loading.style.boxShadow="2px 4px 2px #777";
			body.appendChild(loading);
		}

},
complete: function(){
	iAjx--;
	if(iAjx==0){
		var body = document.body;
		var preloading = document.getElementById("preloading");
		if(preloading){
				body.removeChild(preloading);
		}
	}
}
});


function userImgError(Obj){
$(Obj).attr('src', '/assets/img/login_user_image.png');
}
/*Funcion que permite traer el id_mnu_ge del
enlace del menu principal de form directa
se define en application.js
@params: route es opcional para elementos que no son cargados desde archivos routes ejemplo function en actions
*/

function getIdMenu(route){
var page = route;
if(!route){
	var path = window.location.pathname;
	var page = path.split("/").pop();
}
return arrayMenu[page].id;
}

//Function download
(function (root, factory) {
if (typeof define === 'function' && define.amd) {
	// AMD. Register as an anonymous module.
	define([], factory);
} else if (typeof exports === 'object') {
	// Node. Does not work with strict CommonJS, but
	// only CommonJS-like environments that support module.exports,
	// like Node.
	module.exports = factory();
} else {
	// Browser globals (root is window)
	root.download = factory();
}
}(this, function () {

return function download(data, strFileName, strMimeType) {

		var self = window, // this script is only for browsers anyway...
		defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
		mimeType = strMimeType || defaultMime,
		payload = data,
		url = !strFileName && !strMimeType && payload,
		anchor = document.createElement("a"),
		toString = function(a){return String(a);},
		myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
		fileName = strFileName || "download",
		blob,
		reader;
		myBlob= myBlob.call ? myBlob.bind(self) : Blob ;

	if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
		payload=[payload, mimeType];
		mimeType=payload[0];
		payload=payload[1];
	}


	if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
		fileName = url.split("/").pop().split("?")[0];
		anchor.href = url; // assign href prop to temp anchor
			if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
					var ajax=new XMLHttpRequest();
					ajax.open( "GET", url, true);
					ajax.responseType = 'blob';
					ajax.onload= function(e){
				download(e.target.response, fileName, defaultMime);
			};
					setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
				return ajax;
		} // end if valid url?
	} // end if url?


	//go ahead and download dataURLs right away
	if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){

		if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
			payload=dataUrlToBlob(payload);
			mimeType=payload.type || defaultMime;
		}else{
			return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
				navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
				saver(payload) ; // everyone else can save dataURLs un-processed
		}

	}//end if dataURL passed?

	blob = payload instanceof myBlob ?
		payload :
		new myBlob([payload], {type: mimeType}) ;


	function dataUrlToBlob(strUrl) {
		var parts= strUrl.split(/[:;,]/),
		type= parts[1],
		decoder= parts[2] == "base64" ? atob : decodeURIComponent,
		binData= decoder( parts.pop() ),
		mx= binData.length,
		i= 0,
		uiArr= new Uint8Array(mx);

		for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

		return new myBlob([uiArr], {type: type});
	 }

	function saver(url, winMode){

		if ('download' in anchor) { //html5 A[download]
			anchor.href = url;
			anchor.setAttribute("download", fileName);
			anchor.className = "download-js-link";
			anchor.innerHTML = "downloading...";
			anchor.style.display = "none";
			document.body.appendChild(anchor);
			setTimeout(function() {
				anchor.click();
				document.body.removeChild(anchor);
				if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
			}, 66);
			return true;
		}

		// handle non-a[download] safari as best we can:
		if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
			url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			if(!window.open(url)){ // popup blocked, offer direct download:
				if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
			}
			return true;
		}

		//do iframe dataURL download (old ch+FF):
		var f = document.createElement("iframe");
		document.body.appendChild(f);

		if(!winMode){ // force a mime that will download:
			url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
		}
		f.src=url;
		setTimeout(function(){ document.body.removeChild(f); }, 333);

	}//end saver




	if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
		return navigator.msSaveBlob(blob, fileName);
	}

	if(self.URL){ // simple fast and modern way using Blob and URL:
		saver(self.URL.createObjectURL(blob), true);
	}else{
		// handle non-Blob()+non-URL browsers:
		if(typeof blob === "string" || blob.constructor===toString ){
			try{
				return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
			}catch(y){
				return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
			}
		}

		// Blob but not URL support:
		reader=new FileReader();
		reader.onload=function(e){
			saver(this.result);
		};
		reader.readAsDataURL(blob);
	}
	return true;
}; /* end download() */
}));
