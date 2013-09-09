var fs = require('fs');


exports.fileHandler = {
  readTableRecordData: function(table, id){
    console.log("readTableRecordData running");
    var file = ("data/" + table + '/' + id + ".json");
    var data = fs.readFileSync(file, 'utf-8');
    return data;
  },

  readTableData: function(table){
    console.log("readTableData running");
    var directory = ("data/" + table + "/");
    console.log("the directory is: " + directory);
    var filesArray = fs.readdirSync(directory);
    console.log("the files in that directory are: " + filesArray);
    var dataArray = [];

    filesArray.forEach(function(el){
      
      dataArray.push(fs.readFileSync((directory+el), 'utf-8'));  
    
    }); 

    return dataArray;
  },

  writeRecord: function(table, id, data){
    //if the id exists, replace the record with the data
    
    //otherwise add this record
  
  }
}
