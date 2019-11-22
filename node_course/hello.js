/*
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

*/
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
//*************************************************************************
/*

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let usuario = {
 nombre:'',
 apellido: ''
};
let respuesta = {
 error: false,
 codigo: 200,
 mensaje: ''
};
app.get('/', function(req, res) {
 respuesta = {
  error: true,
  codigo: 200,
  mensaje: 'Punto de inicio'
 };
 res.send(respuesta);
});
app.get('/usuario', function (req, res) {
 respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
 };
 if(usuario.nombre === '' || usuario.apellido === '') {
  respuesta = {
   error: true,
   codigo: 501,
   mensaje: 'El usuario no ha sido creado'
  };
 } else {
  respuesta = {
   error: false,
   codigo: 200,
   mensaje: 'respuesta del usuario',
   respuesta: usuario
  };
 }
 res.send(respuesta);
});
app.post('/usuario', function (req, res) {
 if(!req.body.nombre || !req.body.apellido) {
  respuesta = {
   error: true,
   codigo: 502,
   mensaje: 'El campo nombre y apellido son requeridos'
  };
 } else {
  if(usuario.nombre !== '' || usuario.apellido !== '') {
   respuesta = {
    error: true,
    codigo: 503,
    mensaje: 'El usuario ya fue creado previamente'
   };
  } else {
   usuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido
   };
   respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'Usuario creado',
    respuesta: usuario
   };
  }
 }
 
 res.send(respuesta);
});
app.put('/usuario', function (req, res) {
 if(!req.body.nombre || !req.body.apellido) {
  respuesta = {
   error: true,
   codigo: 502,
   mensaje: 'El campo nombre y apellido son requeridos'
  };
 } else {
  if(usuario.nombre === '' || usuario.apellido === '') {
   respuesta = {
    error: true,
    codigo: 501,
    mensaje: 'El usuario no ha sido creado'
   };
  } else {
   usuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido
   };
   respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'Usuario actualizado',
    respuesta: usuario
   };
  }
 }
 
 res.send(respuesta);
});
app.delete('/usuario', function (req, res) {
 if(usuario.nombre === '' || usuario.apellido === '') {
  respuesta = {
   error: true,
   codigo: 501,
   mensaje: 'El usuario no ha sido creado'
  };
 } else {
  respuesta = {
   error: false,
   codigo: 200,
   mensaje: 'Usuario eliminado'
  };
  usuario = { 
   nombre: '', 
   apellido: '' 
  };
 }
 res.send(respuesta);
});
app.use(function(req, res, next) {
 respuesta = {
  error: true, 
  codigo: 404, 
  mensaje: 'URL no encontrada'
 };
 res.status(404).send(respuesta);
});
app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});

*/


//******************************************************************

var express = require('express');
var app = express();
var session = require('express-session');

app.use( session( {
  /* Aquí irían los atributos de nuestra sesión, como claves,
   * cómo se guarda, tiempo de expiración, etc...
   */
}));

var auth = function(req, res, next) {
  if (req.session && req.session.user === "jose" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};


app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');
  } else if(req.query.username === "jose" || req.query.password === "hunter2") {
    req.session.user = "jose";
    req.session.admin = true;
  }
});

app.get('/logout', function (req, res) {
  req.session.destroy();
});

app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});