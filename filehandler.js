var fs = require('fs');


exports.fileHandler = {
  readTableRecordData: function(table, id){
    var file = ("data/" + table + '/' + id + ".json");
    var data = fs.readFileSync(file, 'utf-8');
    return data;
  },

  readTableData: function(table){
    var directory = ("data/" + table + "/");
    var filesArray = fs.readdirSync(directory);
    var dataArray = [];

    filesArray.forEach(function(el, i){
      console.log("iteration " + i); 
      dataArray.push(fs.readFileSync((directory+el), 'utf-8'));  
    
    }); 

    return 'this is the array: ' + dataArray;
  },

  writeRecord: function(table, id, data){
    var file = ("data/" + table + '/' + id + ".json");
    fs.writeFileSync(file, data);
  }
}
