//module that converts file data into objects for the system
var filehandler = require('./filehandler');


exports.createDatabase = function(){

  var allData = (filehandler.readAllData()); 

  return allData;
};

