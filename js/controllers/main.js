'use strict';

/**
 * @ngdoc function
 * @name reportesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reportesApp
 */
// angular.module('ProjectsApp')
  angularRoutingApp.controller('MainCtrl', function ($scope, $http, $timeout, gridConfig, $routeParams) {



    $scope.reportTitle = "Projects aproved";
    /*projects, pipeline, inventory, donors*/
    $scope.reportType = $routeParams.project?$routeParams.project:'projects';

    gridConfig.columnsGrid($scope.reportType);
    /*Crear libreria js comun [incluir aqui nombre meses]*/
    var userInformationComplete = function(response){

      _.each(response.data, function(item){
        if(item.operationNum !== null){
          item.stage = 'APR';
        }else if (item.donorsDateSts && item.donorsDateSts == 'Y') {
          item.stage = 'III';
        }else if(item.qrrDateSts && item.qrrDateSts == 'Y'){
          item.stage = 'II';
        }else if(item.mifeDateSts && item.mifeDateSts == 'Y'){
          item.stage = 'I';
        }
      });

      gridConfig.globalProductList = response.data;

      /*Habilitar esto si se vuelve al maestro detalle*/
      /*var groupProjects = _.groupBy(response.data, function(element){
        return element.projectNum
      });

      var projectsList = _.map(groupProjects, function(group){
          var tmp=0;
          _.each(group, function(a){ tmp += a.currentApprovedAmount})
          return {
              projectNum: group[0].projectNum,
              name: group[0].name,
              documentId: group[0].documentId,
              countryBeneficiary: group[0].countryBeneficiary,
              countryBeneficiaryName: group[0].countryBeneficiaryName,
              coverage: group[0].coverage,
              projectExecutorAcronym: group[0].projectExecutorAcronym,
              approvalDate: group[0].approvalDate,
              approvalYear: group[0].approvalYear,
              projectOriginalApprovedAmount: group[0].projectOriginalApprovedAmount,
              projectCounterpartAmount: group[0].projectCounterpartAmount,
              designTeamleaderNm: group[0].designTeamleaderNm,
              projectStatus: group[0].projectStatus,
              total: tmp,
              operations: group
          }
      });*/

      window.calculateProjects =  function(groupName) {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        //var group = _.filter(dataSource.group(), function(item){ return item.field == groupName});
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var dataGrid = query.filter(filters).data;
        var projectList;
        //if(groupName){
          //projectList = _.map(_.groupBy(dataGrid.items, function(element){return element.projectNum}), function(group){return {projectNum: group[0].projectNum}});
        //}else{
          projectList = _.map(_.groupBy(dataGrid, function(element){return element.projectNum}), function(group){return {projectNum: group[0].projectNum}});
        //∫}
        return projectList.length;
      }



      var localDataSource = new kendo.data.DataSource({
        data: gridConfig.globalProductList,
        //data: projectsList,
        pageSize: 10,
        group: gridConfig.gridcolumnsGroup,
        aggregate: gridConfig.gridAggregates,
        schema:  gridConfig.configSchema,
        sort: { field: "projectNum", dir: "asc" }

      });

      /*Kendo Grid*/
      $scope.gridOptions = {
        toolbar: ["excel","pdf"],
        pdf: {
          allPages: true,
          fileName: "Kendo UI Grid Export.pdf",
          // proxyURL: "http://demos.telerik.com/kendo-ui/service/export",
          paperSize: "A4",
          margin: "0.5cm",
          landscape: true
        },
        pdfExport: function(e) {
          var grid = $("#grid").data("kendoGrid");
          //Agregar o quitar columnas antes de exportar a pdf



          grid.autoFitColumn(1);
          grid.autoFitColumn(2);
          grid.autoFitColumn(3);
          grid.autoFitColumn(4);
          grid.autoFitColumn(5);
          grid.autoFitColumn(6);
          grid.autoFitColumn(7);
          grid.autoFitColumn(8);
          grid.autoFitColumn(9);
          grid.autoFitColumn(10);
          grid.autoFitColumn(11);
          grid.autoFitColumn(12);
          grid.autoFitColumn(13);
          grid.autoFitColumn(14);
          grid.autoFitColumn(15);
          grid.autoFitColumn(16);
          grid.autoFitColumn(17);
          grid.autoFitColumn(18);
          grid.autoFitColumn(19);
          grid.autoFitColumn(20);
          grid.autoFitColumn(21);
          grid.autoFitColumn(22);
          grid.autoFitColumn(23);

          grid.dataSource.pageSize(10);
          // grid.refresh();
          //Desbloquear columnas antes de exportar a pdf
          grid.dataSource.page(2);
          grid.dataSource.page(1);
          grid.hideColumn("pipelineYear");
          grid.hideColumn("projectNum");
          grid.hideColumn("countryBeneficiaryName");
          grid.unlockColumn("pipelineYear");
          grid.unlockColumn("projectNum");
          grid.unlockColumn("countryBeneficiaryName");
          grid.showColumn("pipelineYear");
          grid.showColumn("projectNum");
          grid.showColumn("countryBeneficiaryName");


          //this.expandRow(this.tbody.find("tr.k-master-row"));
          e.promise.progress(function(e) {
           e.page = formatPage(e);
          }).done(function() {
            grid.dataSource.pageSize(10);
            grid.refresh();
            // grid.showColumn(1);
            // grid.showColumn(2);
            // grid.showColumn(3);
            // grid.showColumn(4);
            // grid.showColumn(5);
            // grid.showColumn(6);
            // grid.showColumn(7);
            // grid.showColumn(8);
            // grid.showColumn(9);
            // grid.showColumn(10);
            grid.lockColumn("pipelineYear");
            grid.lockColumn("projectNum");
            grid.lockColumn("countryBeneficiaryName");


          });
        },
        excel: {
            allPages: true
        },
        dataBound: function() {

          gridConfig.detailExportPromises = [];
          this.expandRow(this.tbody.find("tr.k-master-row").first());
           // this.expandRow(this.tbody.find("tr.k-master-row"));
        },
        //height: "80vh",
        // filterable: {mode:"row"},
        filterable: true,
        excelExport: function(e) {exportToExcel(e,gridConfig.childColumns,$scope.reportTitle, $scope.reportType)},
        groupable: true,
        sortable: true,
        scrollable: true,
        resizable: true,
        pageable: true,
        /*pageable: {
                    refresh: false,
                    pageSizes: true,
                    buttonCount: 10
                },*/
        //detailInit: detailInit,
        dataSource: localDataSource,
        columns: gridConfig.parentColumns

      };




     function detailInit(e) {
       var detailRow = e.detailRow;

       detailRow.find(".tabstrip").kendoTabStrip({
           animation: {
               open: { effects: "fadeIn" }
           }
       });

       var detailDataSource = new kendo.data.DataSource({

        //  data: _.where(globalProductLIst, {projectNum:  e.data.projectNum}),
         data: e.data.operations,
         schema:  gridConfig.configSchema
       });

       $("<div/>").appendTo(e.detailCell).kendoGrid({
         dataSource: detailDataSource,
         scrollable: false,
         sortable: true,
         pageable: false,
         editable:true, //Solo para pipeline
         columns: gridConfig.childColumns
       });

     }
     setTimeout(function(){
        // Arregla el tamaño de las celdas cuando están bloqueadas
        var grid = $("#grid").data("kendoGrid");
        grid.dataSource.pageSize(10);
      }, 1000);

    };




  // Import Drawing API namespaces
  var draw = kendo.drawing;
  var geom = kendo.geometry;



  // See
  // http://docs.telerik.com/kendo-ui/framework/drawing/drawing-dom#dimensions-and-css-units-for-pdf-output
  function mm(val) {
    return val * 2.8347;
  }



  // A4 Sheet with 1 cm borders, landscape
  var PAGE_RECT = new geom.Rect(
    // [mm(0), 0], [mm(297 - 20), mm(410 - 20)]
    [mm(0), 0], [mm(297 - 20), mm(210 - 20)]
  );

  // Spacing between header, content and footer
  var LINE_SPACING = mm(5);

  function formatPage(e) {
     var header = createHeader();
     var content = e.page;
     var footer = createFooter(e.pageNumber, e.totalPages);

     // Remove header, footer and spacers from the page size
     var contentRect = PAGE_RECT.clone();
     contentRect.size.height -= header.bbox().height() + footer.bbox().height() + 2 * LINE_SPACING;

     // Fit the content in the available space
     draw.fit(content, contentRect)

     // Do a final layout with content
     var page = new draw.Layout(PAGE_RECT, {
       // "Rows" go below each other
       orientation: "vertical",

       // Center rows relative to each other
       alignItems: "center",

       // Center the content block horizontally
       alignContent: "center",

       // Leave spacing between rows
       spacing: LINE_SPACING
     });
     page.append(header, content);
     page.reflow();

     // Move the footer to the bottom-right corner
     page.append(footer);
     draw.vAlign([footer], PAGE_RECT, "end");
     draw.align([footer], PAGE_RECT, "end");

     return page;
   }





   function createHeader() {
     var rect = new geom.Rect(
       [5, 5],  // Position of the top left corner
       [800, 80] // Size of the rectangle
   );
    return new draw.Image("../../images/Projects-aproved.png", rect);


    //  var circleGeometry = new geom.Circle([100, 100], 20);
    //    return   new draw.Circle(circleGeometry).stroke("red", 1);

    //  return new kendo.drawing.Text("Fomin.", [0, 0], {
    //    font: mm(8) + "px 'DejaVu Sans'"
    //  });
   }

   function createFooter(page, total) {
     return new kendo.drawing.Text(
       kendo.format("Page {0} of {1}", page, total),
       [0, 0], {
         font: mm(3) + "px 'DejaVu Sans'"
       }
     );
   }


    var onError = function(reason){
      console.log(reason.data.message);
      $scope.error = reason.data.message;
    };



    var config = {
         method: 'POST',
         url: 'http://hqtamif01:8001/Projects',
         /*params: {paged:"true",pageSize:"50",pageNumber:"1",orderBy:"ProjectNum"},*/
         /*params: {},*/
         data: gridConfig.configData,
         headers: {
          'Authorization': 'Basic am1lamlhQGlhZGIub3JnOmExNjkwYmQ5ZWE0ZTRlMzlhODU1NWI5YzdmODFlZjIw',
          'Content-Type': 'application/json; charset=utf-8',
          'X-HTTP-Method-Override': 'GET'
         }
    }
    $http(config).then(userInformationComplete, onError);

  });
