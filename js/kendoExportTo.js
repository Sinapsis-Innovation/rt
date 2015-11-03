var masterData;
var RowsGroup=0, j=-1, allOpetarions = [], childColumns=[], bgHeader="#CCC", titleHeader="#000";


var exportToExcel = function(e, childCol, reporTitle, reportType){
  e.preventDefault();
  masterData=null;
  RowsGroup=0;
  j=-1;
  allOpetarions = [];

  //Load the grid data to export
  var workbook = e.workbook;

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
  var dataSource = $("#grid").data("kendoGrid").dataSource;
  RowsGroup = dataSource.group().length;
  for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
    workbook.sheets[0].rows[i].cells.unshift({width: 30});
     if(workbook.sheets[0].rows[i].type != 'header' && workbook.sheets[0].rows[i].type != 'group-header'){
      //workbook.sheets[0].rows[i].cells[5].value = kendo.toString(new Date(workbook.sheets[0].rows[i].cells[5].value),"dd/MMM/yyyy");
      //workbook.sheets[0].rows[i].cells[12].value = kendo.toString(workbook.sheets[0].rows[i].cells[12].value, "c2");
      //workbook.sheets[0].rows[i].cells[13].value = kendo.toString(workbook.sheets[0].rows[i].cells[13].value, "c2");
      if(reportType == 'projects'){
        //Center columns
        for (var k = 0; k < workbook.sheets[0].rows[i].cells.length; k++) {
          if(k != (7+RowsGroup) && k != (13+RowsGroup) && k != (14+RowsGroup)) workbook.sheets[0].rows[i].cells[k].hAlign = "center";
          if(k == (13+RowsGroup) || k == (14+RowsGroup)){
            workbook.sheets[0].rows[i].cells[k].hAlign = "right";
            //workbook.sheets[0].rows[i].cells[k].format = "$#,###0";
          }
        }

        if(workbook.sheets[0].rows[i].cells[5+RowsGroup].value)workbook.sheets[0].rows[i].cells[5+RowsGroup].value = kendo.toString(new Date(workbook.sheets[0].rows[i].cells[5+RowsGroup].value), "dd-MMM-yyyy");

        //workbook.sheets[0].rows[i].cells[13+RowsGroup].value = workbook.sheets[0].rows[i].cells[13+RowsGroup].value ? workbook.sheets[0].rows[i].cells[13+RowsGroup].value : 0;
        //workbook.sheets[0].rows[i].cells[14+RowsGroup].value = workbook.sheets[0].rows[i].cells[14+RowsGroup].value ? workbook.sheets[0].rows[i].cells[14+RowsGroup].value : 0;

        workbook.sheets[0].rows[i].cells[13+RowsGroup].format = "$#,###0";
        workbook.sheets[0].rows[i].cells[14+RowsGroup].format = "$#,###0";
        //workbook.sheets[0].rows[i].cells[18].format = "$#,###0";
      }else if(reportType == 'pipeline'){
        for (var k = 0; k < workbook.sheets[0].rows[i].cells.length; k++) {
          if(k != (4+RowsGroup) && k != (9+RowsGroup) && k != (10+RowsGroup)) workbook.sheets[0].rows[i].cells[k].hAlign = "center";
          if(k == (9+RowsGroup) || k == (10+RowsGroup)){
            workbook.sheets[0].rows[i].cells[k].hAlign = "right";
            //workbook.sheets[0].rows[i].cells[k].format = "$#,###0";
          }
        }
        //validar si hay valores nulos en los valores y asignar el cero
        workbook.sheets[0].rows[i].cells[9+RowsGroup].value = workbook.sheets[0].rows[i].cells[9+RowsGroup].value ? workbook.sheets[0].rows[i].cells[9+RowsGroup].value : 0;
        workbook.sheets[0].rows[i].cells[10+RowsGroup].value = workbook.sheets[0].rows[i].cells[10+RowsGroup].value ? workbook.sheets[0].rows[i].cells[10+RowsGroup].value : 0;

        //Formato moneda
        workbook.sheets[0].rows[i].cells[9+RowsGroup].format = "$#,###0";
        workbook.sheets[0].rows[i].cells[10+RowsGroup].format = "$#,###0";
        //Formato fecha
        workbook.sheets[0].rows[i].cells[11+RowsGroup].format = workbook.sheets[0].rows[i].cells[11+RowsGroup].value ? 'dd-MMM-yy' : '';
        workbook.sheets[0].rows[i].cells[12+RowsGroup].format = workbook.sheets[0].rows[i].cells[12+RowsGroup].value ? 'dd-MMM-yy' : '';
        workbook.sheets[0].rows[i].cells[13+RowsGroup].format = workbook.sheets[0].rows[i].cells[13+RowsGroup].value ? 'dd-MMM-yy' : '';
        workbook.sheets[0].rows[i].cells[14+RowsGroup].format = workbook.sheets[0].rows[i].cells[14+RowsGroup].value ? 'dd-MMM-yy' : '';
        workbook.sheets[0].rows[i].cells[15+RowsGroup].format = workbook.sheets[0].rows[i].cells[15+RowsGroup].value ? 'dd-MMM-yy' : '';
        workbook.sheets[0].rows[i].cells[16+RowsGroup].format = workbook.sheets[0].rows[i].cells[16+RowsGroup].value ? 'dd-MMM-yy' : '';
        workbook.sheets[0].rows[i].cells[17+RowsGroup].format = workbook.sheets[0].rows[i].cells[17+RowsGroup].value ? 'dd-MMM-yy' : '';

      }else if(reportType == 'inventory'){
        for (var k = 0; k < workbook.sheets[0].rows[i].cells.length; k++) {
          if(k != (9+RowsGroup) && k != (10+RowsGroup)) workbook.sheets[0].rows[i].cells[k].hAlign = "center";
          if(k == (9+RowsGroup) || k == (10+RowsGroup))workbook.sheets[0].rows[i].cells[k].hAlign = "right";
        }

        workbook.sheets[0].rows[i].cells[9+RowsGroup].value = workbook.sheets[0].rows[i].cells[9+RowsGroup].value ? workbook.sheets[0].rows[i].cells[9+RowsGroup].value : 0;
        workbook.sheets[0].rows[i].cells[10+RowsGroup].value = workbook.sheets[0].rows[i].cells[10+RowsGroup].value ? workbook.sheets[0].rows[i].cells[10+RowsGroup].value : 0;
        workbook.sheets[0].rows[i].cells[9+RowsGroup].format = "$#,###0";
        workbook.sheets[0].rows[i].cells[10+RowsGroup].format = "$#,###0";
      }

    }else if(workbook.sheets[0].rows[i].type != 'group-header'){
      for (var k = 0; k < workbook.sheets[0].rows[i].cells.length; k++) {
        workbook.sheets[0].rows[i].cells[k].hAlign = "center";
        workbook.sheets[0].rows[i].cells[k].background = bgHeader;
        workbook.sheets[0].rows[i].cells[k].color = titleHeader;
      }
    }
  }


  workbook.sheets[0].title = "All Rows";
  //workbook.sheets[1].title = "All Rows";
  // save the workbook
  kendo.saveAs({
    dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
    fileName: reporTitle + " "+ kendo.toString(kendo.parseDate(new Date()), 'dd/MMM/yyyy HH:MM') +".xlsx"
  });
}

var exportChildData = function(OperationList,projectNum, rowIndex, RowsGroup) {
 var deferred = $.Deferred();

 detailExportPromises.push(deferred);

 var exporter = new kendo.ExcelExporter({
   columns: childColumns,/* [{field: "operationNum", title: configuration.gridheader.approvalNumber},
             {field: "mifAccess", title: configuration.gridheader.access},
             {field: "operationType", title: configuration.gridheader.type},
             {field: "financingType", title: configuration.gridheader.financingType},
             {field: "originalApprovedAmount", title: configuration.gridheader.originalAmount, attributes:{style:"text-align:right;"}},
             {field: "currentApprovedAmount", title: configuration.gridheader.currentApproved, format: '{0:c0}', attributes:{class:"numbers"}},
             {field: "disbursedAmount", title: configuration.gridheader.cofinancing, attributes:{style:"text-align:right;"}},
             {field: "supervisionTeamleaderNm", title: configuration.gridheader.supervisionTeamLeader},
             {field: "operationStatus", title: configuration.gridheader.status}
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
   columns: [{field: "countryBeneficiary", title: configuration.gridheader.country},
             {field: "approvalYear", title: configuration.gridheader.approvalYear},
             {field: "projectNum", title: configuration.gridheader.projectNumber},
             {field: "operationNum", title: configuration.gridheader.approvalNumber},
             {field: "approvalDate",title: configuration.gridheader.approvalDate},
             {field: "documentId", title: configuration.gridheader.documentId},
             {field: "name", title: configuration.gridheader.projectName},
             {field: "projectExecutorAcronym", title: configuration.gridheader.documentAcronym},
             {field: "mifAccess", title: configuration.gridheader.access},
             {field: "operationType", title: configuration.gridheader.type},
             {field: "financingType", title: configuration.gridheader.financingType},
             {field: "originalApprovedAmount", title: configuration.gridheader.originalAmount},
             {field: "currentApprovedAmount", title: configuration.gridheader.currentApproved},
             {field: "disbursedAmount", title: configuration.gridheader.cofinancing},
             {field: "total", title: configuration.gridheader.total},
             {field: "designTeamleaderNm", title: configuration.gridheader.designTeamLeader},
             {field: "supervisionTeamleaderNm", title: configuration.gridheader.supervisionTeamLeader},
             {field: "operationStatus", title: configuration.gridheader.status}
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
