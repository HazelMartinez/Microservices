
var http = require("http"),
	fs =require("fs");




http.createServer(function(req,res){
	fs.readFile("./index.html",function(err,html){
		var html_string = html.toString();
		//var variables = html_string.match();
		for(var i = variables.length - 1; i >= 0; i--){
			var value = eval(variables[i]);
			html_string = html_string.replace("{"+variables[i]+"}", value);
		};
		res.writeHead(200, {"Content-Type": "text-html"})
		res.write(html_string);
		res.end();
	});


}).listen(8010);


/*
const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

// this example reads the file synchronously
// you can read it asynchronously also
let xml_string = fs.readFileSync("nombres.xml", "utf8");

parser.parseString(xml_string, function(error, result) {
    if(error === null) {
        console.log(result);
    }
    else {
        console.log(error);
    }
});
*/