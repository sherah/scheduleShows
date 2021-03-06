var fs = require("fs");
var requestsFile = (__dirname + '/requests.txt');

exports.getRequests = function getRequests(){

  return fs.readFileSync(requestsFile, 'utf-8');

}


exports.setRequest = function setRequest(month, day, personID){
 
  var data = fs.readFileSync(requestsFile);
 
  var id = data.toString().split('\n').length;

  var body = ( id + "," + month + "," + day + ',' + personID + "," + 'unapproved' + '\n');

  //append this user to the request file.
  fs.appendFile(requestsFile, body, function(err){
  
    if(err){
      console.log(err);
    } else {
      console.log("the request for person #" + personID + " on " + month + "/" + day + " was added with an id of " + id);
    }
  
  });

}
