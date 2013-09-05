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

  var approvedRequests = [];

  requests.forEach(function(el, i, arr){
 
    var record = el.split(',');
    
    if(record[record.length-1] === 'approved'){
      approvedRequests.push(el);
    } 
  
  });
 
  if(approvedRequests){
    fs.writeFileSync(approvedFile, approvedRequests);
    return approvedRequests.toString();
  } else {
    return "There are no approved requests."
  }

}


exports.setApprovedRequest = function setApprovedRequest(id){
  
  id = (parseInt(id)+1);

  //split the file out.
  var requests = fs.readFileSync(requestsFile, 'utf-8');
  requests = requests.split("\n");

  var changingRecord = requests[id];
  var changingRecordArray = changingRecord.split(',');

  changingRecordArray[changingRecordArray.length - 1] = "approved";

  var newRecord = changingRecordArray.join(',');
  
  requests[id] = newRecord; 

  requests.forEach(function(el, i){
  
    el = el + "\n"; 
    
  });
  var newRequests = requests.join('\n');
  fs.writeFileSync(requestsFile, newRequests);

  return newRequests.toString(); 
}
