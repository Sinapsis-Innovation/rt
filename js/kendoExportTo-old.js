var masterData;
var RowsGroup=0, j=-1, allOpetarions = [], childColumns=[];


var exportToExcel = function(e, childCol, reporTitle, reportType){
  e.preventDefault();
  childColumns=childCol;
  masterData=null;
  RowsGroup=0;
  j=-1;
  allOpetarions = [];

  var workbook = e.workbook;
  detailExportPromises = [];
  allDetailExportPromises = [];


  //format values
  // _.each(workbook.sheets[0].rows, function(item){
  //   if(item.type != 'header'){
  //     item.cells[7].value = kendo.toString(item.cells[7].value, "c2");
  //     item.cells[8].value = kendo.toString(item.cells[8].value, "c2");
  //     item.cells.unshift({});
  //   }
  // });

  //recursiveRows(e.data);

  /*for (var rowIndex = 0; rowIndex < masterData.length; rowIndex++) {
    exportChildData(masterData[rowIndex].projectNum, rowIndex);
  }*/
  //allExportChildData(e.data);

  //$.when.apply(null, detailExportPromises)
  //.then(function() {
    // get the export results
    var detailExports = $.makeArray(arguments);

    // sort by masterRowIndex
    detailExports.sort(function(a, b) {
      return a.masterRowIndex - b.masterRowIndex;
    });

    // add an empty column
    workbook.sheets[0].columns.unshift({
      width: 30
    });

    // prepend an empty cell to each row
    //workbook.sheets[0].rows = formatParentRows(workbook.sheets[0].rows);
    for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
      workbook.sheets[0].rows[i].cells.unshift({width: 30});
       if(workbook.sheets[0].rows[i].type != 'header'){
        //workbook.sheets[0].rows[i].cells[5].value = kendo.toString(new Date(workbook.sheets[0].rows[i].cells[5].value),"dd/MMM/yyyy");
        //workbook.sheets[0].rows[i].cells[12].value = kendo.toString(workbook.sheets[0].rows[i].cells[12].value, "c2");
        //workbook.sheets[0].rows[i].cells[13].value = kendo.toString(workbook.sheets[0].rows[i].cells[13].value, "c2");
        // if(reportType == 'projects'){
        //   workbook.sheets[0].rows[i].cells[13].format = "$#,###0";
        //   workbook.sheets[0].rows[i].cells[14].format = "$#,###0";
        //   workbook.sheets[0].rows[i].cells[15].format = "$#,###0";
        //   workbook.sheets[0].rows[i].cells[16].format = "$#,###0";
        //   workbook.sheets[0].rows[i].cells[17].format = "$#,###0";
        //   workbook.sheets[0].rows[i].cells[18].format = "$#,###0";
        // }else if(reportType == 'pipeline'){
        //   workbook.sheets[0].rows[i].cells[8].value = workbook.sheets[0].rows[i].cells[8].value ? workbook.sheets[0].rows[i].cells[8].value : 0;
        //   workbook.sheets[0].rows[i].cells[9].value = workbook.sheets[0].rows[i].cells[9].value ? workbook.sheets[0].rows[i].cells[9].value : 0;
        //   workbook.sheets[0].rows[i].cells[10].value = workbook.sheets[0].rows[i].cells[10].value ? workbook.sheets[0].rows[i].cells[10].value : 0;
        //
        //   workbook.sheets[0].rows[i].cells[8].format = "$#,###0";
        //   workbook.sheets[0].rows[i].cells[9].format = "$#,###0";
        //   workbook.sheets[0].rows[i].cells[10].format = "$#,###0";
        // }else if(reportType == 'inventory'){
        //   workbook.sheets[0].rows[i].cells[9].value = workbook.sheets[0].rows[i].cells[9].value ? workbook.sheets[0].rows[i].cells[9].value : 0;
        //   workbook.sheets[0].rows[i].cells[10].value = workbook.sheets[0].rows[i].cells[10].value ? workbook.sheets[0].rows[i].cells[10].value : 0;
        //   workbook.sheets[0].rows[i].cells[11].value = workbook.sheets[0].rows[i].cells[11].value ? workbook.sheets[0].rows[i].cells[11].value : 0;
        //   workbook.sheets[0].rows[i].cells[9].format = "$#,###0";
        //   workbook.sheets[0].rows[i].cells[10].format = "$#,###0";
        //   workbook.sheets[0].rows[i].cells[11].format = "$#,###0";
        // }

      }
    }

    // merge the detail export sheet rows with the master sheet rows
    // loop backwards so the masterRowIndex doesn't need to be updated
    /*for (var i = detailExports.length - 1; i >= 0; i--) {
      var masterRowIndex = detailExports[i].masterRowIndex + 1 + detailExports[i].rowGroup; // compensate for the header row

      var sheet = detailExports[i].sheet;

      // prepend an empty cell to each row
      for (var ci = 0; ci < sheet.rows.length; ci++) {
        if (typeof  sheet.rows[ci].cells[0].value !== "undefined") {
          for(k=0; k<$('.k-grouping-header div').length+1;k++){
            sheet.rows[ci].cells.unshift({});
          }
        }
      }

      // insert the detail sheet rows after the master row
      [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
    }*/

    // all operations
    //$.when.apply(null, allDetailExportPromises)
    //.then(function() {
      //var allDetailExports = $.makeArray(arguments);
      //workbook.sheets.push(allDetailExports[0].sheet);
      workbook.sheets[0].title = "All Rows";
      //workbook.sheets[1].title = "All Rows";
      // save the workbook
      kendo.saveAs({
        dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
        fileName: reporTitle + " "+ kendo.toString(kendo.parseDate(new Date()), 'dd/MMM/yyyy HH:MM') +".xlsx"
      });

    //});




  //});
}

var exportChildData = function(OperationList,projectNum, rowIndex, RowsGroup) {
 var deferred = $.Deferred();

 detailExportPromises.push(deferred);

 var exporter = new kendo.ExcelExporter({
   columns: childColumns,/* [{field: "operationNum", title: dictionary.gridheader.approvalNumber},
             {field: "mifAccess", title: dictionary.gridheader.access},
             {field: "operationType", title: dictionary.gridheader.type},
             {field: "financingType", title: dictionary.gridheader.financingType},
             {field: "originalApprovedAmount", title: dictionary.gridheader.originalAmount, attributes:{style:"text-align:right;"}},
             {field: "currentApprovedAmount", title: dictionary.gridheader.currentApproved, format: '{0:c0}', attributes:{class:"numbers"}},
             {field: "disbursedAmount", title: dictionary.gridheader.cofinancing, attributes:{style:"text-align:right;"}},
             {field: "supervisionTeamleaderNm", title: dictionary.gridheader.supervisionTeamLeader},
             {field: "operationStatus", title: dictionary.gridheader.status}
           ],*/
   dataSource: OperationList
 });

 exporter.workbook().then(function(book, data) {
   deferred.resolve({
     masterRowIndex: rowIndex,
     rowGroup: RowsGroup,
     sheet: book.sheets[0]
   });
 });
}


var allExportChildData = function(operations) {
 var deferred = $.Deferred();
 var allOpetarions = allRows(operations);

 allDetailExportPromises.push(deferred);

 var exporter = new kendo.ExcelExporter({
   columns: [{field: "countryBeneficiary", title: dictionary.gridheader.country},
             {field: "approvalYear", title: dictionary.gridheader.approvalYear},
             {field: "projectNum", title: dictionary.gridheader.projectNumber},
             {field: "operationNum", title: dictionary.gridheader.approvalNumber},
             {field: "approvalDate",title: dictionary.gridheader.approvalDate},
             {field: "documentId", title: dictionary.gridheader.documentId},
             {field: "name", title: dictionary.gridheader.projectName},
             {field: "projectExecutorAcronym", title: dictionary.gridheader.documentAcronym},
             {field: "mifAccess", title: dictionary.gridheader.access},
             {field: "operationType", title: dictionary.gridheader.type},
             {field: "financingType", title: dictionary.gridheader.financingType},
             {field: "originalApprovedAmount", title: dictionary.gridheader.originalAmount},
             {field: "currentApprovedAmount", title: dictionary.gridheader.currentApproved},
             {field: "disbursedAmount", title: dictionary.gridheader.cofinancing},
             {field: "total", title: dictionary.gridheader.total},
             {field: "designTeamleaderNm", title: dictionary.gridheader.designTeamLeader},
             {field: "supervisionTeamleaderNm", title: dictionary.gridheader.supervisionTeamLeader},
             {field: "operationStatus", title: dictionary.gridheader.status}
         ],
   dataSource: allOpetarions
 });

 exporter.workbook().then(function(book, data) {

   var sheet = book.sheets[0];

   for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
     var row = sheet.rows[rowIndex];
     row.cells[4].value = kendo.toString(new Date(row.cells[4].value), "dd/MMM/yyyy");//verificar valores nulos
     row.cells[11].value = kendo.toString(row.cells[11].value, "c2");//verificar valores nulos
     row.cells[12].value = kendo.toString(row.cells[12].value, "c2");//verificar valores nulos
     row.cells[13].value = kendo.toString(row.cells[13].value, "c2");//verificar valores nulos
   }
   deferred.resolve({
     sheet: book.sheets[0]
   });
 });
}

function formatParentRows(data){
  var columnGroup = $('.k-grouping-header div').length;
  data =  _.filter(data, function(item) {return item.type != 'group-footer'});
  /*_.each(data, function(e){
    if(e.type != 'header' && e.type != "group-header" && e.type != "group-footer"){
      e.cells[3+columnGroup].value = kendo.toString(new Date(e.cells[3+columnGroup].value),"dd/MMM/yyyy");
      e.cells[7+columnGroup].value = kendo.toString(e.cells[7+columnGroup].value, "c2");
      e.cells[8+columnGroup].value = kendo.toString(e.cells[8+columnGroup].value, "c2");
    }
  });*/
  return data;
}


function allRows(data)
{
    _.each(data, function(e){
      if(e.field)
        allRows(e.items);
      else
        _.each(e.operations, function(a){ allOpetarions.push(a)});
    });
  return allOpetarions;
}

function recursiveRows(data)
{
  for (var rowIndex = 0; rowIndex < data.length; rowIndex++) {
    if(data[0].field){
      RowsGroup+=1;
      recursiveRows(data[rowIndex].items);
    }else{
      j++;
      exportChildData(data[rowIndex].operations,data[rowIndex].projectNum, j, RowsGroup);
    }
  }
}
