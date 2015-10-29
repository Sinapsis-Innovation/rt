'use strict';

/**
 * @ngdoc service
 * @name reportesApp.gridConfig
 * @description
 * # gridConfig
 * Factory in the reportesApp.
 */
angular.module('ProjectsApp')
  .factory('gridConfig', function () {
    // Service logic
    // ...
    var config = {};
    config.gridcolumns = [];
    config.parentColumns = [];
    config.childColumns = [];
    config.gridcolumns = [];
    config.gridcolumnsGroup = [];
    config.gridAggregates = [];
    config.globalProductList = [];
    config.ignoreColumns = [];
    config.configData = {};
    config.configSchema = {};
    config.detailExportPromises = [];
    config.reportTemplate= {};



    Date.locale = {
       en: {
          month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
       },
       sp: {
          month_names: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          month_names_short: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
       },
       fr: {
          month_names: ['Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre'],
          month_names_short: ['Jan', 'F&eacute;v', 'Mar', 'Avr', 'Mai', 'Jui', 'Juil', 'Ao&ucirc;', 'Sep', 'Oct', 'Nov', 'D&eacute;c']
       },
       po: {
          month_names: ['Janeiro', 'Fevereiro', 'Mar&ccedil;o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          month_names_short: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
       }
    };


    config.getFormatDate = function(date){
      var itemDate = new Date(date.substring(0, 10));
      return ('0' + itemDate.getDate()).slice(-2) + '/' + Date.locale['en'].month_names_short[(itemDate.getMonth())] + '/' + itemDate.getFullYear();
    }




    config.columnsGrid = function(reportOption){

      switch(reportOption){
        case "projects":
          this.ignoreColumns = ['countryBeneficiaryName', 'approvalYear','projectNum' ];
           this.parentColumns = [
             {
               field: "countryBeneficiaryName",
               title: configuration.gridheader.country,
               locked: true,
               width:"100px",
               aggregates: "count",
               footerTemplate: "Total",
               groupHeaderTemplate: configuration.gridheader.country + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
               //groupHeaderTemplate: configuration.gridheader.country +": #= value # "+configuration.gridheader.projects+": #= window.calculateProjects(e)# "+ configuration.gridheader.operations +": #= count #"
             },{
               field: "approvalYear",
               title: configuration.gridheader.approvalYear,
               //headerTemplate: "<strong>Name Edit</strong>",
               locked: true,
               width:"110px",
               attributes:{style:"text-align:center;"},
               aggregates: "count",
               groupHeaderTemplate: configuration.gridheader.approvalYear + ": #=value# (#=count#)"
             },{
               field: "projectNum",
               title: configuration.gridheader.projectNumber,
               locked: true,
               width:"150px",
               aggregates: ["count"],
               footerTemplate: configuration.gridheader.projects + ": #= window.calculateProjects()#",
               groupHeaderTemplate: configuration.gridheader.projectNumber + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
             },{
               field: "operationNum",
               title: configuration.gridheader.approvalNumber,
               aggregates: ["count"],
               footerTemplate: configuration.gridheader.operations + ": #=count#",
               groupHeaderTemplate: configuration.gridheader.approvalNumber + ": #=value# (#=count#)",
               locked: true,
               width:"150px",
               attributes:{style:"text-align:center;"}
             },{
               field: "approvalDate",
               title: configuration.gridheader.approvalDate,
               format: "{0: dd/MMM/yyyy}",
               width:"100px",
               filterable : {
                  ui: function (element) {
                      element.kendoDatePicker({
                          format: "dd/MMM/yyyy"
                      });
                  }
               },
               aggregates: "count",
               groupHeaderTemplate: configuration.gridheader.approvalDate + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
             },{
               field: "documentId",
               title: configuration.gridheader.documentId,
               width:"100px",
               aggregates: ["count"],
               filterable: { cell: {operator: "contains"}},
               groupHeaderTemplate: configuration.gridheader.documentId + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
             },{
               field: "name",
               title: configuration.gridheader.projectName,
               width:"250px",
               aggregates: ["count"],
               filterable: { cell: {operator: "contains"}},
               groupHeaderTemplate: configuration.gridheader.projectName + ": #=value# (#=count#)"
             },{
               field: "projectExecutorAcronym",
               title: configuration.gridheader.documentAcronym,
               width:"120px",
               aggregates: ["count"],
               filterable: { cell: {operator: "contains"}},
               groupHeaderTemplate: configuration.gridheader.documentAcronym + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
             },{
               field: "mifAccess",
               title: configuration.gridheader.access,
               width:"150px",
               aggregates: ["count"],
               groupHeaderTemplate: configuration.gridheader.access + ": #=value# (#=count#)",
               template: function(dataItem){
                  var tmp = '';
                  if(dataItem.mifAccess){
                    tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
                  }
                  return tmp;
                },
                attributes:{style:"text-align:center;"}
             },{
               field: "operationFund",
               title: configuration.gridheader.operationFund,
               width:"100px",
               aggregates: ["count"],
               groupHeaderTemplate: configuration.gridheader.operationFund + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
             },{
               field: "operationType",
               title: configuration.gridheader.type,
               width:"100px",
               aggregates: ["count"],
               groupHeaderTemplate: configuration.gridheader.type + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
             },{
               field: "financingType",
               title: configuration.gridheader.financingType,
               width:"120px",
               aggregates: ["count"],
               groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
             },{
               field: "originalApprovedAmount",
               title: configuration.gridheader.originalApprovedAmount,
               width:"150px",
               format: '{0:c0}',
               aggregates: ["sum"],
               footerTemplate: "#= kendo.toString(sum, 'c0') #",
               groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
               attributes:{style:"text-align:right;"}
             },{
               field: "approvedCounterpart",
               title: configuration.gridheader.counterAmount,
               width:"150px",
               format: '{0:c0}',
               aggregates: ["sum"],
               footerTemplate: "#= kendo.toString(sum, 'c0') #",
               groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
               attributes:{style:"text-align:right;", class:"numbers"}
             },{
               field: "designTeamleaderNm",
               title: configuration.gridheader.designTeamLeader,
               width:"180px",
               filterable: { cell: {operator: "contains"}},
               aggregates: "count",
               groupHeaderTemplate: configuration.gridheader.designTeamLeader + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
             },{
               field: "supervisionTeamleaderNm",
               title: configuration.gridheader.supervisionTeamLeader,
               aggregates: ["count"],
               groupHeaderTemplate: configuration.gridheader.supervisionTeamLeader + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"},
               width:"180px"
             },{
               field: "operationStatus",
               title: configuration.gridheader.status,
               width:"100px",
               aggregates: ["count"],
               groupHeaderTemplate: configuration.gridheader.status + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
              }
           ]

           /*this.childColumns = [

             {field: "operationNum", title: configuration.gridheader.approvalNumber},
             {field: "access", title: configuration.gridheader.access, format: "¿?",
              template: function(dataItem){
                var tmp = '';
                if(dataItem.mifAccess){
                  tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
                }
                return tmp;
              }},//"#= mifAccess + ' : ' + mifAccessname #"
             {field: "operationType", title: configuration.gridheader.type, attributes:{style:"text-align:center;"}},
             {field: "financingType", title: configuration.gridheader.financingType, attributes:{style:"text-align:center;"}},
             {field: "originalApprovedAmount", title: configuration.gridheader.originalAmount, format: '{0:c0}', attributes:{style:"text-align:right;"}},
             {field: "currentApprovedAmount", title: configuration.gridheader.currentApproved, format: '{0:c0}', attributes:{style:"text-align:right;", class:"numbers"}},
             {field: "disbursedAmount", title: configuration.gridheader.cofinancing, format: '{0:c0}', attributes:{style:"text-align:right;", class:"numbers"}},
             {field: "supervisionTeamleaderNm", title: configuration.gridheader.supervisionTeamLeader},
             {field: "operationStatus", title: configuration.gridheader.status, attributes:{style:"text-align:center;"}}
          ];*/

           this.gridAggregates = [
             { field: "countryBeneficiary", aggregate: "count" },
             { field: "projectNum", aggregate: "count" },
             { field: "operationNum", aggregate: "count" },
             { field: "approvalYear", aggregate: "count" },
             { field: "approvalDate", aggregate: "count" },
             { field: "name", aggregate: "count" },
             { field: "documentId", aggregate: "count" },
             { field: "originalApprovedAmount", aggregate: "sum" },
             { field: "approvedCounterpart", aggregate: "sum" },
             { field: "projectExecutorAcronym", aggregate: "count" },
             { field: "designTeamleaderNm", aggregate: "count" }
            ];

            this.configSchema = {
                 model: {
                     fields: {
                       approvalYear: { type: "number" },
                       approvalDate: { type: "date" },
                       originalApprovedAmount: { type: "number", defaultValue:0},
                     }
                 }
            };

            this.configData = {projectStatus:["APR"], projectType: ["MIF"]};/*projectNumber: "CO-M1099", approvalYearFrom: ((new Date()).getFullYear() - 1)*/
            this.reportTemplate = {title: configuration.reports.projectsApprove};

        break;
        case 'pipeline':
          this.ignoreColumns = ['countryBeneficiaryName', 'approvalYear','projectNum' ];
          this.parentColumns = [
            {
              field: "countryBeneficiaryName",
              title: configuration.gridheader.country,
              locked: true,
              width:"100px",
              aggregates: "count",
              footerTemplate: "Total",
              groupHeaderTemplate: configuration.gridheader.country + ": #=value# (#=count#)",
              attributes:{style:"text-align:center;"}
            },{
              field: "pipelineYear",
              title: configuration.gridheader.pipelineYear,
              width:"100px",
              locked: true,
              attributes:{style:"text-align:center;"},
              aggregates: "count",
              groupHeaderTemplate: configuration.gridheader.approvalYear + ": #=value# (#=count#)"
            },{
              field: "projectNum",
              title: configuration.gridheader.projectNumber,
              locked: true,
              width:"120px",
              attributes:{style:"text-align:center;"},
              footerTemplate: configuration.gridheader.projects + ": #= window.calculateProjects()#",
              groupHeaderTemplate: configuration.gridheader.projectNumber + ": #=value# (#=count#)"
            },{
              field: "documentId",
              title: configuration.gridheader.documentId,
              width:"120px",
              filterable: { cell: {operator: "contains"}},
              attributes:{style:"text-align:center;"},
              groupHeaderTemplate: configuration.gridheader.documentId + ": #=value# (#=count#)"
            },{
              field: "name",
              title: configuration.gridheader.projectName,
              width:"250px",
              filterable: { cell: {operator: "contains"}},
              groupHeaderTemplate: configuration.gridheader.projectName + ": #=value# (#=count#)"
            },{
              field: "projectExecutorAcronym",
              title: configuration.gridheader.documentAcronym,
              width:"120px",
              attributes:{style:"text-align:center;"},
              filterable: { cell: {operator: "contains"}},
              groupHeaderTemplate: configuration.gridheader.documentAcronym + ": #=value# (#=count#)"
            },{
              field: "mifAccess",
              title: configuration.gridheader.access,
              width:"150px",
              groupHeaderTemplate: configuration.gridheader.access + ": #=value# (#=count#)",
              attributes:{style:"text-align:center;"},
              template: function(dataItem){
                 var tmp = '';
                 if(dataItem.mifAccess){
                   tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
                 }
                 return tmp;
               }
            },{
              field: "operationType",
              title: configuration.gridheader.type,
              width:"100px",
              groupHeaderTemplate: configuration.gridheader.type + ": #=value# (#=count#)",
              attributes:{style:"text-align:center;"}
            },{
              field: "financingType",
              title: configuration.gridheader.financingType,
              width:"120px",
              groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
              attributes:{style:"text-align:center;"}
            },{
              field: "originalApprovedAmount",
              title: configuration.gridheader.originalApprovedAmount,
              width:"150px",
              format: '{0:c0}',
              aggregates: ["sum"],
              footerTemplate: "#= kendo.toString(sum, 'c0') #",
              groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
              attributes:{style:"text-align:right;"},
              template: "#= originalApprovedAmount === null?  '$0' : kendo.toString(originalApprovedAmount, 'c0')#"
            },{
              field: "approvedCounterpart",
              title: configuration.gridheader.counterAmount,
              width:"150px",
              format: '{0:c0}',
              aggregates: ["sum"],
              footerTemplate: "#= kendo.toString(sum, 'c0') #",
              groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
              attributes:{style:"text-align:right;", class:"numbers"},
              template: "#= approvedCounterpart === null?  '$0' : kendo.toString(approvedCounterpart, 'c0')#"
            },{
              field: "mifeDate",
              title: "MIFE",
              width:"100px",
              attributes:{style:"text-align:center;"},
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "pdrEventDate",
              title: "PDR",
              width:"100px",
              attributes:{style:"text-align:center;"},
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "qrrDate",
              title: "QRR",
              width:"100px",
              attributes:{style:"text-align:center;"},
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "secDate",
              title: "SEC",
              width:"100px",
              attributes:{style:"text-align:center;"},
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "sec2Date",
              title: "SEC 2",
              width:"100px",
              attributes:{style:"text-align:center;"},
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "vppDate",
              title: "VPP",
              width:"100px",
              attributes:{style:"text-align:center;"},
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "donorsDate",
              title: "Donors commite Metting",
              width:"100px",
              attributes:{style:"text-align:center;"},
              format: "{0: dd/MMM/yyyy}"
             },{
              field: "distribution",
              title: "Distribution procedure",
              width:"180px",
              attributes:{style:"text-align:center;"},
              format: "¡Pendiente!"
            },{
              field: "operationNum",
              title: configuration.gridheader.approvalNumber,
              width:"150px",
              attributes:{style:"text-align:center;"},
              footerTemplate: configuration.gridheader.operations + ": #=count#",
              template: "#= operationNum === null?  ' ' : operationNum#"
            },{
               field: "stage",
               title: "Stage",
               width:"90px",
               attributes:{style:"text-align:center;"}
             },{
                field: "designTeamleaderNm",
                title: "Team Leader",
                attributes:{style:"text-align:center;"},
                width:"180px"
            }];

          /*this.childColumns = [
            {
              field: "operationNum",
              title: configuration.gridheader.approvalNumber,
              template: "#= operationNum === null?  ' ' : operationNum#"
            },{
              field: "pipelineYear",
              title: configuration.gridheader.pipelineYear
            },
            {field: "access", title: configuration.gridheader.access, format: "¿?",
             template: function(dataItem){
               var tmp = '';
               if(dataItem.mifAccess){
                 tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
               }
               return tmp;
             }
             },{
                 field: "mifeDate",
                 title: "MIFE",
                 format: "{0: dd/MMM/yyyy}"
             },{
                 field: "pdrEventDate",
                 title: "PDR",
                 format: "{0: dd/MMM/yyyy}"
             },{
                 field: "qrrDate",
                 title: "QRR",
                 format: "{0: dd/MMM/yyyy}"
             },{
                 field: "secDate",
                 title: "SEC",
                  format: "{0: dd/MMM/yyyy}"
             },{
                 field: "sec2Date",
                 title: "SEC 2",
                  format: "{0: dd/MMM/yyyy}"
             },{
                 field: "vppDate",
                 title: "VPP",
                  format: "{0: dd/MMM/yyyy}"
             },{
                field: "donorsDate",
                title: "Donors commite Metting",
                format: "{0: dd/MMM/yyyy}"
             },{
               field: "distribution",
               title: "Distribution Procedure",
               //editor: distributionDropDownEditor,
               template: "Standard - For Consideration"
             },
             {field: "operationType", title: configuration.gridheader.type, attributes:{style:"text-align:center;"}},
             {field: "financingType", title: configuration.gridheader.financingType, attributes:{style:"text-align:center;"}},
             {
               field: "originalApprovedAmount",
               title: configuration.gridheader.originalAmount,
               attributes:{style:"text-align:right;"},
               template: "#= originalApprovedAmount === null?  '$0' : kendo.toString(originalApprovedAmount, 'c0')#"
             },
             {
               field: "currentApprovedAmount",
               title: configuration.gridheader.currentApproved,
               attributes:{style:"text-align:right;", class:"numbers"},
               template: "#= currentApprovedAmount === null?  '$0' : kendo.toString(currentApprovedAmount, 'c0')#"
             },
             {
               field: "disbursedAmount",
               title: configuration.gridheader.cofinancing,
               attributes:{style:"text-align:right;", class:"numbers"},
               template: "#= disbursedAmount === null?  '$0' : kendo.toString(disbursedAmount, 'c0')#"
             }
            //  {field: "supervisionTeamleaderNm", title: configuration.gridheader.supervisionTeamLeader}
            //  {field: "operationStatus", title: configuration.gridheader.status, attributes:{style:"text-align:center;"}}
          ];*/
          this.gridAggregates = [
            { field: "countryBeneficiary", aggregate: "count" },
            { field: "projectNum", aggregate: "average" },
            { field: "operationNum", aggregate: "count" },
            { field: "approvalYear", aggregate: "count" },
            { field: "approvalDate", aggregate: "count" },
            { field: "name", aggregate: "count" },
            { field: "documentId", aggregate: "count" },
            { field: "originalApprovedAmount", aggregate: "sum" },
            { field: "approvedCounterpart", aggregate: "sum" },
            { field: "projectExecutorAcronym", aggregate: "count" },
            { field: "designTeamleaderNm", aggregate: "count" }
           ];

          this.configSchema = {
               model: {
                   fields: {
                     mifeDate: { type: "date"},
                     pdrEventDate: { type: "date"},
                     qrrDate: { type: "date"},
                     secDate: { type: "date"},
                     sec2Date: { type: "date"},
                     vppDate: { type: "date"},
                     donorsDate: { type: "date"},
                     distribution: { defaultValue: { DistributionID: 1, DistributionName: "Standard - For Consideration"}},
                     originalApprovedAmount: { type: "number", defaultValue:0},
                   }
               }
          };

          this.reportTemplate = {title: configuration.reports.pipeline};
          this.configData = {projectStatus:["ON"], /*projectNumber: "RG-M1278",*/ projectType: ["MIF"], pipelineYearFrom: (new Date()).getFullYear(),  pipelineYearTo: ((new Date()).getFullYear() + 2)};
        break;
        case 'inventory':
          this.parentColumns = [
            {
              field: "projectNum",
              width:"150px",
              attributes:{style:"text-align:center;"},
              footerTemplate: configuration.gridheader.projects + ": #= window.calculateProjects()#",
              title: configuration.gridheader.inventoryNumber
            },{
              field: "countryBeneficiaryName",
              title: configuration.gridheader.country,
              width:"100px",
              attributes:{style:"text-align:center;"},
              attributes:{style:" text-transform:uppercase;"},
              template: "#= countryBeneficiaryName === null?  projectInstitutionCountryName : countryBeneficiaryName#",
            },{
              field: "mifAccess",
              title: configuration.gridheader.access,
              width:"200px",
              attributes:{style:"text-align:center;"},
              template: function(dataItem){
                 var tmp = '';
                 if(dataItem.mifAccess){
                   tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
                 }
                 return tmp;
              }
            },{
              field: "name",
              title: configuration.gridheader.projectName,
              filterable: { cell: {operator: "contains"}},
            },{
              field: "projectExecutorAcronym",
              title: configuration.gridheader.documentAcronym,
              attributes:{style:"text-align:center;"},
              filterable: { cell: {operator: "contains"}},
            },{
                field: "projectType",
                width:"100px",
                attributes:{style:"text-align:center;"},
                title: configuration.gridheader.projectType
            },{
              field: "financingType",
              title: configuration.gridheader.financingType,
              width:"120px",
              attributes:{style:"text-align:center;"}
            },{
              field: "financingType",
              title: configuration.gridheader.financingType,
              width:"150px",
              groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
              attributes:{style:"text-align:center;"}
            },{
              field: "originalApprovedAmount",
              title: configuration.gridheader.originalApprovedAmount,
              width:"150px",
              format: '{0:c0}',
              aggregates: ["sum"],
              footerTemplate: "#= kendo.toString(sum, 'c0') === null? '$0' :  kendo.toString(sum, 'c0') #",
              groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
              attributes:{style:"text-align:right;"},
              template: "#= originalApprovedAmount === null?  '$0' : kendo.toString(originalApprovedAmount, 'c0')#"
            },{
              field: "approvedCounterpart",
              title: configuration.gridheader.counterAmount,
              width:"150px",
              format: '{0:c0}',
              aggregates: ["sum"],
              footerTemplate: "#= kendo.toString(sum, 'c0') === null? '$0' :  kendo.toString(sum, 'c0') #",
              groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
              attributes:{style:"text-align:right;", class:"numbers"},
              template: "#= approvedCounterpart === null?  '$0' : kendo.toString(approvedCounterpart, 'c0')#"
            },{
              field: "designTeamleaderNm",
              title: configuration.gridheader.designTeamLeader,
              width:"200px",
              filterable: { cell: {operator: "contains"}},
              attributes:{style:"text-align:center;"}
            }]

          /*this.childColumns = [
            {field: "operationNum", title: configuration.gridheader.approvalNumber},
            {field: "access", title: configuration.gridheader.access, format: "¿?",
             template: function(dataItem){
               var tmp = '';
               if(dataItem.mifAccess){
                 tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
               }
               return tmp;
             }},
            {field: "operationType", title: configuration.gridheader.type, attributes:{style:"text-align:center;"}},
            {field: "financingType", title: configuration.gridheader.financingType, attributes:{style:"text-align:center;"}},
            {field: "originalApprovedAmount", title: configuration.gridheader.originalAmount, format: '{0:c0}', attributes:{style:"text-align:right;"}},
            {field: "currentApprovedAmount", title: configuration.gridheader.currentApproved, format: '{0:c0}', attributes:{style:"text-align:right;", class:"numbers"}},
            {field: "disbursedAmount", title: configuration.gridheader.cofinancing, format: '{0:c0}', attributes:{style:"text-align:right;", class:"numbers"}},
            {field: "supervisionTeamleaderNm", title: configuration.gridheader.supervisionTeamLeader},
            {field: "operationStatus", title: configuration.gridheader.status, attributes:{style:"text-align:center;"}}
         ];*/
         this.gridAggregates = [
           { field: "countryBeneficiary", aggregate: "count" },
           { field: "projectNum", aggregate: "average" },
           { field: "operationNum", aggregate: "count" },
           { field: "approvalYear", aggregate: "count" },
           { field: "approvalDate", aggregate: "count" },
           { field: "name", aggregate: "count" },
           { field: "documentId", aggregate: "count" },
           { field: "originalApprovedAmount", aggregate: "sum" },
           { field: "approvedCounterpart", aggregate: "sum" },
           { field: "projectExecutorAcronym", aggregate: "count" },
           { field: "designTeamleaderNm", aggregate: "count" }
          ];

         this.configSchema = {
              model: {
                  fields: {
                    mifeDate: { type: "date"},
                    pdrEventDate: { type: "date"},
                    originalApprovedAmount: { type: "number", defaultValue:0},
                    approvedCounterpart: { type: "number", defaultValue:0}
                  }
              }
         };

         this.configData = {projectType: ["SMP"], projectStatus:["INV"]};
        break;


        case 'donors':
          this.parentColumns = [
            {
              field: "distribution",
              title: "Distribution Procedure",
              attributes:{style:"text-align:center;"},
              template: "¡Pendiente!"
            },{
              field: "mifAccess",
              title: configuration.gridheader.access,
              width:"200px",
              attributes:{style:"text-align:center;"},
              template: function(dataItem){
                 var tmp = '';
                 if(dataItem.mifAccess){
                   tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
                 }
                 return tmp;
              }
            },{
              field: "projectNum", title: configuration.gridheader.projectNumber,
              aggregates: "count",
              attributes:{style:"text-align:center;"},
              groupHeaderTemplate: "Country: #= value # Total: #= count #"
            },{
              field: "name",
              title: configuration.gridheader.projectName,
              filterable: { cell: {operator: "contains"}},
            },{
              field: "donorsDate",
              title: configuration.gridheader.donorsCommittee,
              attributes:{style:"text-align:center;"},
              format: "{0: dd/MMM/yyyy}"
            },{
                field: "designTeamleaderNm",
                title: configuration.gridheader.designTeamLeader,
                attributes:{style:"text-align:center;"},
                filterable: { cell: {operator: "contains"}},
              }];

            this.gridAggregates = [];

            this.configSchema = {
                 model: {
                     fields: {
                       donorsDate: { type: "date"}
                     }
                 }
            };

            this.configData = {projectType: ["MIF"], projectStatus:["DM"]};
        break;
      }
    }

    return config;
  });
