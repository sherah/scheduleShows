var fs = require("fs");
var requestsFile = (__dirname + '/requests.txt');
var approvedFile = (__dirname + '/approvedRequests.txt');

exports.getApprovedRequests = function getApprovedRequests(){

  var requests = fs.readFileSync(requestsFile, 'utf-8');
  if(requests){
    requests = requests.split("\n");
  } else {
    return "there are no requests."
  }

  var approvedRequests;

  requests.forEach(function(el, i, arr){
 
    var record = el.split(',');
    
    if(record.pop() === 'approved'){
      approvedRequests.push(el);
    } 
  
  });
 
  if(approvedRequests){
    return approvedRequests.toString();
  } else {
    return "There are no approved requests."
  }

}


exports.setApprovedRequest = function setApprovedRequest(id){

  //split the file out.
  var requests = fs.readFileSync(requestsFile, 'utf-8');
  requests = requests.split("\n");

  changingRecord = requests[id];
  console.log('the changing record is: ' + changingRecord);
  changingRecord = changingRecord.split(',');
  changingRecord = changingRecord.slice(0, -1);

  console.log('changingRecord is now: ' + changingRecord); 
  changingRecord += ",approved";

  requests[id] = changingRecord;
  console.log('the new line should read: ' + requests[id]);

  console.log('the whole file to write: ' + requests.toString());
  fs.writeFileSync(requestsFile, requests.toString());

  return requests.toString(); 
}
