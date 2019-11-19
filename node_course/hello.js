var express = require('express');

const PORT = 8090;
var app = express();
app.listen(PORT, function(){
    console.log("My http server listening on port " + PORT + "...");
});
app.get('/validar', function(req, res){

    console.log('Hello, World.');
    //res.send(req);
    res.send("hello get");
});

app.post('/validar', function(req,res){
	//res.send(req);
	res.send("hello post");
});
/*
var http = require("http"),
	fs =require("fs");




http.createServer(function(req,res){
	fs.readFile("./index.html",function(err,html){
		res.write(html);
		res.end();
	});


});listen(8000);
*/
