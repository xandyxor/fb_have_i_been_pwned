function doGet() {
  
  // console.log(search("886929597085"));
  return HtmlService.createHtmlOutputFromFile('index');
}

function doPost(e) {
  var param = e.parameter;
  var uid = param.uid;
  var logs = param.log;

  var log = logs.split("\n");
  var fl=log[0].split("=")[1];
  var h=log[1].split("=")[1];
  var ip=log[2].split("=")[1];
  var ts=log[3].split("=")[1];
  var visit_scheme=log[4].split("=")[1];
  var uag=log[5].split("=")[1];
  var colo=log[6].split("=")[1];
  var http=log[7].split("=")[1];
  var loc=log[8].split("=")[1];
  var tls=log[9].split("=")[1];
  var sni=log[10].split("=")[1];
  var warp=log[11].split("=")[1];
  var gateway=log[12].split("=")[1];

  var log_url = 'https://docs.google.com/spreadsheets/d/{{{}}}/edit?usp=sharing'; 
  var log_SpreadSheet = SpreadsheetApp.openByUrl(log_url);
  var log_SheetName = log_SpreadSheet.getSheetByName('table1');
  var LastRow = log_SheetName.getLastRow();
  
  log_SheetName.getRange(LastRow+1, 1).setValue(fl);
  log_SheetName.getRange(LastRow+1, 2).setValue(h);
  log_SheetName.getRange(LastRow+1, 3).setValue(ip);
  log_SheetName.getRange(LastRow+1, 4).setValue(ts);
  log_SheetName.getRange(LastRow+1, 5).setValue(visit_scheme);
  log_SheetName.getRange(LastRow+1, 6).setValue(uag);
  log_SheetName.getRange(LastRow+1, 7).setValue(colo);
  log_SheetName.getRange(LastRow+1, 8).setValue(http);
  log_SheetName.getRange(LastRow+1, 9).setValue(loc);
  log_SheetName.getRange(LastRow+1, 10).setValue(tls);
  log_SheetName.getRange(LastRow+1, 11).setValue(sni);
  log_SheetName.getRange(LastRow+1, 12).setValue(warp);
  log_SheetName.getRange(LastRow+1, 13).setValue(gateway);

  
  // var url = 'https://docs.google.com/spreadsheets/d/{{{{{}}}}}/edit?usp=sharing'; // 前一段取得的 Sheet id
  // var SpreadSheet = SpreadsheetApp.openByUrl(url);
  // var SheetName = SpreadSheet.getSheetByName('table1');

  // if(find_uid(SheetName,uid)==0){
  //   console.log("沒找到");
  //   return ContentService.createTextOutput("no");

  // }else{
  //   console.log("有找到");
  //   return ContentService.createTextOutput("yes");
  // }

  

  if (search(uid) < 0){
    console.log("沒找到");
    return ContentService.createTextOutput("no");

  }else{
    console.log("有找到");
    return ContentService.createTextOutput("yes");
  }


}

function search(num)
{
  var url = 'https://docs.google.com/spreadsheets/d/{{{{{}}}}}/edit?usp=sharing'; 
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  var SheetName = SpreadSheet.getSheetByName('table1');
  var searchString = num;
  var column = 1
  var columnValues = SheetName.getRange(1, column, SheetName.getLastRow()).getValues(); //1st is header row
  var searchResult = columnValues.findIndex(searchString); //Row Index - 2
  return searchResult;
}

Array.prototype.findIndex = function(search){
  if(search == "") return false;
  for (var i=0; i<this.length; i++)
    if (this[i] == search) return i;
  return -1;
} 



// function find_uid(SheetName,uid){
//   //效能太差，已棄用
//   var Lastrow = SheetName.getLastRow();

//   for (var i=1; i<=Lastrow; i++){   
//     var Check = SheetName.getRange(i,1).getValue();
//     // Logger.log(Check);
//     if (Check == uid){ 
//       Logger.log("yes");
//       return 1
//     }
//   }
//   return 0
// }