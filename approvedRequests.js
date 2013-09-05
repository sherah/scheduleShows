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
  
  id = (parseInt(id)+1);

  //split the file out.
  var requests = fs.readFileSync(requestsFile, 'utf-8');
  requests = requests.split("\n");

  var changingRecord = requests[id];
  var changingRecordArray = changingRecord.split(',');

  changingRecordArray[changingRecordArray.length - 1] = "approved";

  var newRecord = changingRecordArray.join(',');
  
  requests[id] = newRecord; 
  console.log('the new line should read: ' + requests[id]);

  requests.forEach(function(el, i){
  
    console.log('the element is: ' + el);
    el = el + "\n"; 
    
  });
  var newRequests = requests.join('\n');
  console.log('the whole file to write: ' + newRequests);
  fs.writeFileSync(requestsFile, newRequests);

  return newRequests.toString(); 
}
