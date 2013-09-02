console.log("server is running!");
var express = require('express');
var app = express();
var http = require("http");
var fs = require("fs");
var url = require("url");
var users = require("./users");
var requests = require("./requests");
var approvedRequests = require("./approvedRequests");
var querystring = require("querystring");
  

http.createServer(function(request, response){
  console.log('request.read is: ' + request.read);

  var path = url.parse(request.url).pathname;
  var queryStr = url.parse(request.url).query;
  console.log(path);

  runQuery(path, queryStr);

  getBody(path, function(err, body){
  
    if(err){
      response.writeHead(500, {
        'Content-Length': err.length,
        'Content-Type': 'text/html'
      });

      response.end(err);
      return;
    }

    response.writeHead(200, {
      'Content-Length': body.length,
      'Content-Type': 'text/html'
    });

    response.end(body);
  
  });


}).listen(5000);


function runQuery(path, qs){ 
  console.log('runQuery path: ' + path + " and querystring: " + qs);

  if(!qs){
    return;
  }
 
  var query = querystring.parse(qs);
  console.log('the querystring in runQuery:' + querystring);

  if(query.name){
    
    users.setUser(query.name);

  } else if(query.month){
 
    requests.setRequest(query.month, query.day, query.personID);   

  } else if(query.requestID){
    
    approvedRequests.getApprovedRequests();
  
  }

};


function getBody(path, callback){

  var body;
  var err;
  
  if(path === "/"){
  
    body = fs.readFileSync(__dirname + '/index.html'); 
  
  } else if(path === "/style.css") {
  
    body = fs.readFileSync(__dirname + '/style.css');
  
  } else if(path === '/getUsers'){
    
    body = users.getUsers();
  
  } else if(path === '/setUser') {
  
    body = "this will return setUser! The path is: " + path;
  
  } else if(path === '/getRequests') {
  
    body = requests.getRequests();
  
  } else if(path === '/setRequest') {
  
    body = "this will return setRequest.";
  
  } else if(path === '/getApprovedRequests'){
  
    body = approvedRequests.getApprovedRequests(); 
  
  } else if(path === '/setApprovedRequest'){
  
    body = "sets approved request."

  } else {
  
    err = "this path doesn't work!";
  
  }

 callback(err, body); 

}
