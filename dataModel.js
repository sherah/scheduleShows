//module that converts file data into objects for the system
var filehandler = require('./filehandler');


exports.createDatabase = function(){

  var allData = (filehandler.readAllData()); 

  //now transform this data into objects with which the app can more easily work
  for(i in allData.data){
  
    var table = new Table(i, allData.data[i]);
  
  }

  console.log('this should read out requests: ' + allData.data.requests); 

  return allData;
};


function Table(name, rows){

  this.name = name;
  this.rows = rows;
  console.log("the new object reads: name= " + this.name + ", rows= " + rows);

  //todo: add functionality for CRUD

}


