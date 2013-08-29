var fs = require("fs");
var requestsFile = (__dirname + '/requests.txt');

exports.getRequests = function getRequests(){

  return fs.readFileSync(requestsFile, 'utf-8');

}


exports.setRequest = function setRequest(month, day, personID){
 
  //set the id to be the next available number
  fs.readFile(requestsFile, function(err, data){
  
    var id = data.toString().split(' ').length;
  
    var body = ("\n" + id + "," + month + "," + day + ',' + personID + "," + 'unapproved');

    //append this user to the request file.
    fs.appendFile(requestsFile, body, function(err){
    
      if(err){
        console.log(err);
      } else {
        console.log("the request for person #" + personID + " on " + month + "/" + day + " was added with an id of " + id);
      }
    
    });

  });
  


}
