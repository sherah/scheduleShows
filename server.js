var express = require('express');
var app = express();
var http = require("http");
var fs = require("fs");
var url = require("url");
var users = require("./users");
var requests = require("./requests");
var approvedRequests = require("./approvedRequests");
var querystring = require("querystring");
var fileHandler = require("./fileHandler");


http.createServer(function(request, response){

  var path = url.parse(request.url).pathname;
  var queryStr = url.parse(request.url).query;

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

  if(!qs){
    return;
  }
 
  var query = querystring.parse(qs);

  if(query.name){
    users.setUser(query.name);

  } else if(query.userID){
    users.getUser(query.userID);
  
  } else if(query.month){
    requests.setRequest(query.month, query.day, query.personID);   

  } else if(query.requestID){
    approvedRequests.setApprovedRequest(query.requestID);
  
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
  
  } else if(path === '/getUser'){
    
    body = "this will return the user that was specified";
  
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
