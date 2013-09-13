//module that converts file data into objects for the system
var filehandler = require('./filehandler');


exports.createDatabase = function(){

  var allData = (filehandler.readAllData()); 

  //now transform this data into objects with which the app can more easily work
  var tables = allData.data.tables;



  return allData;
};

