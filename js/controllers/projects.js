'use strict';

/**
 * @ngdoc function
 * @name reportesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reportesApp
 */
  angularRoutingApp.controller('ProjectsCtrl', function($scope, $http, gridConfig, $routeParams) {


    /*projects, pipeline, inventory, donors*/
    $scope.reportType = $routeParams.project;



    $scope.reportTitle = "Projects group by Pipeline Year";

    gridConfig.columnsGrid($scope.reportType);
    /*Crear libreria js comun [incluir aqui nombre meses]*/
    var userInformationComplete = function(response) {


      gridConfig.globalProductLIst = response.data;

      var groupProjects = _.groupBy(response.data, function(element){
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
      });

      var localDataSource = new kendo.data.DataSource({
        data: projectsList,
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

           //Agregar o quitar columnas antes de exportar a pdf
           grid.showColumn(3);
           grid.hideColumn(4);

           //Desbloquear columnas antes de exportar a pdf
           grid.unlockColumn("name");

           //this.expandRow(this.tbody.find("tr.k-master-row"));
           e.promise.progress(function(e) {
             // Fired for each page
             // http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-pdfExport
            e.page = formatPage(e);
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
         // filterable: {mode:"row"},
         filterable: true,
         excelExport: function(e) {exportToExcel(e)},
         groupable: true,
         sortable: true,
         scrollable: false,
         pageable: true,
         detailInit: detailInit,
         dataSource: localDataSource,
         columns: gridConfig.parentColumns

       };

       function detailInit(e) {
         if($scope.reportType !="donors"){
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

       }
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
        [5, 5], // Position of the top left corner
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
        kendo.format("Page {0} of {1}", page, total), [0, 0], {
          font: mm(3) + "px 'DejaVu Sans'"
        }
      );
    }









    var onError = function(reason) {
      $scope.error = 'The server not response';
    };


    var config = {
               method: 'POST',
               url: 'http://hqtamif01:8001/Projects',
               //url: 'http://mifservicest.iadb.org/Projects',
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
