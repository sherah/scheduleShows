var fs = require('fs');

exports.readAllData = function(){
  var tables = fs.readdirSync("data/");
  var returndata = {}; 
  var table = {};

  tables.forEach(function(el,i){
    table[el] = {};
    returndata.data = table;
  });

  for(j in returndata.data){
    
    table[j] = ((exports.readTableData(j)).toString());
  
  };

  return returndata; 
};

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
