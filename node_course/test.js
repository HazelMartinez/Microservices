var express = require("express"),
    bodyParser =require("body-parser"),
    app = express(),
    port = 8082;


app.get("/", function(req, res) {
    res.send("App works!!");
})

var resultadoFinal=convertXml2JSon("hazel","hazel123");
console.log(resultadoFinal);

function convertXml2JSon(user, password) {
  // 0 permiso de todo
  //1 no esta en la lista 
  //2 solo descargar
  var  rol=5;
var fs = require("fs"),
  parseString = require("xml2js").parseString;

fs.readFile("users.xml", "utf-8", function(err, data) {
  if (err) console.log(err);
  // we log out the readFile results
  //console.log(data);
  // we then pass the data to our method here
  parseString(data, function(err, result) {
    if (err) console.log(err);
    // here we log the results of our xml string conversion
    //console.log(result);

    
    var listaUsers = [];

    for(var i in result)
      //console.log(result[i].element.user);
      listaUsers.push(result[i].element);

     var usuarios=listaUsers[0]; 
    for (var j in usuarios){

      if (usuarios[j].user==user && usuarios[j].password==password ){
        rol =usuarios[j].rol[0];
        return rol;
        break;
      }
      
    }
    return rol;
    //console.log(listaUsers);
  });
});
return rol;
}

app.listen(port, function(){
    console.log("My http server listening on port " + port + "...");
});
