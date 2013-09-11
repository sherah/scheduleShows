var fs = require('fs');


exports.readTableRecordData = function(table, id){
  var file = ("data/" + table + '/' + id + ".json");
  var data = fs.readFileSync(file, 'utf-8');
  return data;
};

exports.readTableData = function(table){
  var directory = ("data/" + table + "/");
  var filesArray = fs.readdirSync(directory);
  var dataArray = [];

  filesArray.forEach(function(el, i){

    dataArray.push(fs.readFileSync((directory+el), 'utf-8'));  
  
  }); 

  return dataArray;
};

exports.writeRecord = function(table, id, data){
  var file = ("data/" + table + '/' + id + ".json");
  fs.writeFileSync(file, data);
};
