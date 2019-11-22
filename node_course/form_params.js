
var http = require("http"),
	fs =require("fs");




http.createServer(function(req,res){

	//console.log(req);
	if(req.url.indexOf("favicon.ico")>0){
		return;	
	}

	console.log("==========\n\n");
	console.log(req);
	console.log("==========\n\n");

	fs.readFile("./index.html",function(err,html){
		var html_string = html.toString(); //para transformar el archivo binario a una cadena
		var arreglo_parametros = [];
		var parametros = [];
		//Expresion regular que busca donde haya {}
		var variables = html_string.match(/[^\{\}]+(?=\})/g); 
		//expresion regular para encontrar una cierta cadena, match(expersion regular) y retorna un arreglo con todas las incidencias. 
		var nombre = "";
		if(req.url.indexOf("?")>0){
			// ?nombre = Hazel
			var url_data = req.ulr.split("?");
			var arreglo_parametros =  url_data[1].split("&"); 
		}

		for (var i = arreglo_parametros.length - 1; i >= 0; i--) {
			var parametro = arreglo_parametros[i];
			var param_data = parametro.split("=");
			parametros[param_data[0]] = param_data[1];
		};

		for (var i = variables.length - 1; i >= 0; i--) {
			/*
			var value = eval(variables[i]);
			html_string = html_string.replace("{"+variables[i]+"}", value);
			*/
			var variable = variables[i];
			html_string = html_string.replace("{"+variables[i]+"}", parametros[variable[i]]);


		};

		res.writeHead(200,{"Content-Type": "text/html"})
		res.write(html_string);
		res.end();
	});


}).listen(8000);