
var http = require("http"),
	fs =require("fs");




http.createServer(function(req,res){
	fs.readFile("./index.html",function(err,html){
		var html_string = html.toString(); //para transformar el archivo binario a una cadena
		//Expresion regular que busca donde haya {}
		var variables = html_string.match(/[^\{\}]+(?=\})/g); 
		//expresion regular para encontrar una cierta cadena, match(expersion regular) y retorna un arreglo con todas las incidencias. 

		var nombre = "CE";

		for (var i = variables.length - 1; i >= 0; i--) {
			var value = eval(variables[i]);
			html_string = html_string.replace("{"+variables[i]+"}", value);

		}

		res.writeHead(200,{"Content-Type": "text/html"})
		res.write(html_string);
		res.end();
	});


}).listen(8000);