'use strict';

/**
 * @ngdoc function
 * @name reportesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reportesApp
 */
// angular.module('ProjectsApp')
angularRoutingApp.controller('MainCtrl', function($scope, $http, $timeout, gridConfig, $routeParams) {



  $scope.reportTitle = "Projects";
  $scope.menuTitles = configuration.menu;
  /*projects, pipeline, inventory, donors*/
  $scope.reportType = $routeParams.project ? $routeParams.project : 'projects';

  gridConfig.columnsGrid($scope.reportType);


  /*Crear libreria js comun [incluir aqui nombre meses]*/
  var userInformationComplete = function(response) {



    _.each(response.data, function(item) {
      if (item.operationNum !== null) {
        item.stage = 'APR';
      } else if (item.donorsDateSts && item.donorsDateSts == 'Y') {
        item.stage = 'III';
      } else if (item.qrrDateSts && item.qrrDateSts == 'Y') {
        item.stage = 'II';
      } else if (item.mifeDateSts && item.mifeDateSts == 'Y') {
        item.stage = 'I';
      }

      if (!item.originalApprovedAmount) item.originalApprovedAmount = 0;
      if (!item.approvedCounterpart) item.approvedCounterpart = 0;
      var formatDate;
      if (item.approvalDate) {
        formatDate = new Date(new Date(item.approvalDate).setHours(0));
        item.approvalDate = new Date(formatDate.setDate(formatDate.getDate() + 1));
      }
      if (item.mifeDate) {
        formatDate = new Date(new Date(item.mifeDate).setHours(0));
        item.mifeDate = kendo.parseDate(new Date(formatDate.setDate(formatDate.getDate() + 1)), "dd-MMM-yy");
      }
      if (item.pdrEventDate) {
        formatDate = new Date(new Date(item.pdrEventDate).setHours(0));
        item.pdrEventDate = kendo.parseDate(new Date(formatDate.setDate(formatDate.getDate() + 1)), "dd-MMM-yy");
      }
      if (item.qrrDate) {
        formatDate = new Date(new Date(item.qrrDate).setHours(0));
        item.qrrDate = new Date(formatDate.setDate(formatDate.getDate() + 1));
      }
      if (item.secDate) {
        formatDate = new Date(new Date(item.secDate).setHours(0));
        item.secDate = new Date(formatDate.setDate(formatDate.getDate() + 1));
      }
      if (item.sec2Date) {
        formatDate = new Date(new Date(item.sec2Date).setHours(0));
        item.sec2Date = new Date(formatDate.setDate(formatDate.getDate() + 1));
      }
      if (item.vppDate) {
        formatDate = new Date(new Date(item.vppDate).setHours(0));
        item.vppDate = new Date(formatDate.setDate(formatDate.getDate() + 1));
      }

      if (item.donorsDate) {
        formatDate = new Date(new Date(item.donorsDate).setHours(0));
        item.donorsDate = new Date(formatDate.setDate(formatDate.getDate() + 1));
      }
    });

    gridConfig.globalProductList = response.data;

    // Si el reporte es de tipo Donors no repetir operaciones
    if ($scope.reportType == 'donors') {
      var groupProjects = _.groupBy(response.data, function(element) {
        return element.projectNum
      });

      var projectsList = _.map(groupProjects, function(group) {
        var tmp = 0;
        _.each(group, function(a) {
          tmp += a.currentApprovedAmount
        })
        return {
          projectNum: group[0].projectNum,
          name: group[0].name,
          mifAccess: group[0].mifAccess,
          mifAccessname: group[0].mifAccessname,
          pipelineYear: group[0].pipelineYear,
          donorsDate: group[0].donorsDate,
          designTeamleaderNm: group[0].designTeamleaderNm,
          total: tmp,
          operations: group
        }
      });

      gridConfig.globalProductList = projectsList;
    }

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

    window.calculateProjects = function(groupName) {
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
      projectList = _.map(_.groupBy(dataGrid, function(element) {
        return element.projectNum
      }), function(group) {
        return {
          projectNum: group[0].projectNum
        }
      });
      //∫}
      return projectList.length;
    }



    var localDataSource = new kendo.data.DataSource({
      data: gridConfig.globalProductList,
      //data: projectsList,
      pageSize: 10,
      group: gridConfig.gridcolumnsGroup,
      aggregate: gridConfig.gridAggregates,
      schema: gridConfig.configSchema,
      sort: {
        field: "projectNum",
        dir: "asc"
      }

    });

    /*Kendo Grid*/
    $scope.gridOptions = {
      toolbar: ["excel", "pdf"],
      pdf: {
        allPages: true,
        fileName: gridConfig.reportTemplate.title + " " + kendo.toString(kendo.parseDate(new Date()), 'dd/MMM/yyyy HH:MM') + ".pdf",
        // proxyURL: "http://demos.telerik.com/kendo-ui/service/export",
        paperSize: "legal",
        margin: "1cm",
        landscape: true
      },
      pdfExport: function(e) {
        var grid = $("#grid").data("kendoGrid");
        //Agregar o quitar columnas antes de exportar a pdf
        $("#grid").width(2300);

        for (var i = 0; i <= gridConfig.ignoreColumns.length; i++) {
          grid.hideColumn(gridConfig.ignoreColumns[i]);
          //console.log(gridConfig.ignoreColumns);
        }
        var oldPageSize = grid.dataSource.pageSize();
        var rowsPerPage = 10 - grid.dataSource.group().length * 2
        grid.dataSource.pageSize(rowsPerPage);
        //Desbloquear columnas antes de exportar a pdf
        if ($scope.reportType != "inventory" && $scope.reportType != "donors") {
          grid.unlockColumn("countryBeneficiaryName");
          grid.unlockColumn("approvalYear");
          grid.unlockColumn("projectNum");
          grid.unlockColumn("pipelineYear");
        }

        //this.expandRow(this.tbody.find("tr.k-master-row"));
        e.promise.progress(function(e) {
          e.page = formatPage(e);
        }).done(function() {
          $("#grid").width('100%');
          grid.dataSource.pageSize(oldPageSize);
          grid.refresh();

          for (var i = 0; i <= gridConfig.ignoreColumns.length; i++) {
            grid.showColumn(gridConfig.ignoreColumns[i]);
          };
          if ($scope.reportType != "inventory" && $scope.reportType != "donors") {
            grid.lockColumn("countryBeneficiaryName");
            grid.lockColumn("projectNum");
            grid.lockColumn("pipelineYear");

            grid.reorderColumn(1, grid.columns[0]);
          }

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
      filterMenuInit: function(e) {
        if (e.field === "countryBeneficiaryName" || e.field === "stage") {
          //var filterMultiCheck = this.thead.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck")
          var filterMultiCheck;
          if (this.lockedHeader) {
            filterMultiCheck = this.lockedHeader.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck");
          } else {
            filterMultiCheck = this.thead.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck");
          }
          filterMultiCheck.container.empty();
          filterMultiCheck.checkSource.sort({
            field: e.field,
            dir: "asc"
          });

          filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());
          filterMultiCheck.createCheckBoxes();
        }
      },
      //height: "800",
      // filterable: {mode:"row"},
      filterable: true,
      selectable: "multiple cell",
      navigatable: true,
      excelExport: function(e) {
        exportToExcel(e, gridConfig.childColumns, gridConfig.reportTemplate.title, $scope.reportType)
      },
      groupable: true,
      sortable: true,
      scrollable: true,
      resizable: true,
      dataBound: onDataBinding,
      //pageable: true,
      pageable: {
        refresh: false,
        pageSizes: [10, 20, 30, 40, 50]
          //buttonCount: 10
      },
      //detailInit: detailInit,
      dataSource: localDataSource,
      columns: gridConfig.parentColumns

    };

    function onDataBinding() {

      var grid = $("#grid").data("kendoGrid");
      var dropdown = grid.pager.element
        .find(".k-pager-sizes [data-role=dropdownlist]")
        .data("kendoDropDownList");

      var allItem = _.filter(dropdown.dataSource.data(), function(item) {
        return item.text == "All"
      });
      if (allItem.length == 0) {
        var item = {};
        item[dropdown.options.dataTextField] = "All";
        item[dropdown.options.dataValueField] = 1000000;
        dropdown.dataSource.add(item);
      }

    }




    function detailInit(e) {
      var detailRow = e.detailRow;

      detailRow.find(".tabstrip").kendoTabStrip({
        animation: {
          open: {
            effects: "fadeIn"
          }
        }
      });

      var detailDataSource = new kendo.data.DataSource({

        //  data: _.where(globalProductLIst, {projectNum:  e.data.projectNum}),
        data: e.data.operations,
        schema: gridConfig.configSchema
      });

      $("<div/>").appendTo(e.detailCell).kendoGrid({
        dataSource: detailDataSource,
        scrollable: false,
        sortable: true,
        pageable: false,
        editable: true, //Solo para pipeline
        columns: gridConfig.childColumns
      });

    }
    setTimeout(function() {
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
    // [mm(0), 0], [mm(297 - 20), mm(210 - 20)]
    [mm(0), 0], [mm(356 - 20), mm(216 - 20)]
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
      // "Rows" go below each other *vertical
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
    return new draw.Image("/Images/projects/reports/" + $scope.reportType + (configuration.language == "SP" ? "_sp" : "") + ".png", rect);


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
    console.log(reason.data.message);
    $scope.error = reason.data.message;
  };



  var config = {
    method: 'POST',
    url: configuration.infoConnect.servicesUrl + 'Projects',
    /*params: {paged:"true",pageSize:"50",pageNumber:"1",orderBy:"ProjectNum"},*/
    /*params: {},*/
    data: gridConfig.configData,
    headers: {
      'Authorization': configuration.infoConnect.authorization, //'Basic am1lamlhQGlhZGIub3JnOmExNjkwYmQ5ZWE0ZTRlMzlhODU1NWI5YzdmODFlZjIw',
      'Content-Type': 'application/json; charset=utf-8',
      'X-HTTP-Method-Override': 'GET'
    }
  }
  $http(config).then(userInformationComplete, onError);

});
