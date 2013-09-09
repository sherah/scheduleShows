var fs = require('fs');


exports.fileHandler = {
  readTableRecordData: function(table, id){
    var file = ("data/" + table + '/' + id + ".json");
    var data = fs.readFileSync(file, 'utf-8');
    return data;
  },

  readTableData: function(table){
    var directory = ("data/" + table);
    var filesArray = fs.readdirSync(directory);
    var dataArray = [];

    filesArray.forEach(function(el){
      
      dataArray.push(fs.readFileSync(el));  
    
    }); 

    return dataArray;
  },

  writeRecord: function(table, id, data){
    //if the id exists, replace the record with the data
     
    //otherwise add this record
  
  }
}
