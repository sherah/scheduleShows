var fs = require("fs");
var requestsFile = (__dirname + '/requests.txt');
var approvedFile = (__dirname + '/approvedRequests.txt');

exports.getApprovedRequests = function getApprovedRequests(){

  var requests = fs.readFileSync(requestsFile, 'utf-8');
  requests = requests.split("\n");

  var approvedRequests;

  requests.forEach(function(el, i, arr){
 
    var record = el.split(',');
    
    if(record.pop() === 'approved'){
      approvedRequests.push(el);
    } 
  
  });
 
  return approvedRequests.toString();
}


exports.setApprovedRequest = function setApprovedRequest(id){

  //split the file out.
  var requests = fs.readFileSync(requestsFile, 'utf-8');
  requests = requests.split("\n");

  changingRecord = requests[id];
  changingRecord.split(',');
  changingRecord.slice(0, -1);
  changingRecord.push("approved");

  requests[id] = changingRecord;

  return requests.toString(); 
}
