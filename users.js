var fs = require("fs");
var userFile = (__dirname + "/users.txt");


exports.getUser = function getUser(id){

  var data = fs.readFileSync(userFile);
    
  var users = data.toString().split("\n");

  var index = id-1;

  return users[index];

};

exports.getUsers = function getUsers(){

  return fs.readFileSync(userFile, 'utf-8');

};


exports.setUser = function setUser(name){

  //set the id to be the next available number
  fs.readFile(userFile, function(err, data){

    data = data.toString();
    var users = data.split("\n");

    var id = users.length;
  
    var body = (id + "," + name + "\n");

    //append this user to the user file.
    fs.appendFile(userFile, body, function(err){
    
      if(err){
        console.log(err);
      } else {
        console.log(name + " was added with an id of " + id);
      }
    
    });

  });
  
};


