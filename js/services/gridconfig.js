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
           this.parentColumns = [
             {
               field: "countryBeneficiaryName",
               title: dictionary.gridheader.country,
               locked: true,
               width:"100px",
               aggregates: "count",
               footerTemplate: "Total",
               groupHeaderTemplate: dictionary.gridheader.country + ": #=value# (#=count#)"
               //groupHeaderTemplate: dictionary.gridheader.country +": #= value # "+dictionary.gridheader.projects+": #= window.calculateProjects(e)# "+ dictionary.gridheader.operations +": #= count #"
             },{
               field: "approvalYear",
               title: dictionary.gridheader.approvalYear,
               locked: true,
               width:"100px",
               attributes:{style:"text-align:center;"},
               aggregates: "count",
               groupHeaderTemplate: dictionary.gridheader.approvalYear + ": #=value# (#=count#)"
             },{
               field: "projectNum",
               title: dictionary.gridheader.projectNumber,
               locked: true,
               width:"150px",
               footerTemplate: dictionary.gridheader.projects + ": #= window.calculateProjects()#",
               groupHeaderTemplate: dictionary.gridheader.projectNumber + ": #=value# (#=count#)"
             },{
               field: "operationNum",
               title: dictionary.gridheader.approvalNumber,
               aggregates: ["count"],
               footerTemplate: dictionary.gridheader.operations + ": #=count#",
               groupHeaderTemplate: dictionary.gridheader.approvalNumber + ": #=value# (#=count#)",
               locked: true,
               width:"150px"
             },{
               field: "approvalDate",
               title: dictionary.gridheader.approvalDate,
               format: "{0: dd/MMM/yyyy}",
               width:"150px",
               filterable : {
                  ui: function (element) {
                      element.kendoDatePicker({
                          format: "dd/MMM/yyyy"
                      });
                  }
               },
               aggregates: "count",
               groupHeaderTemplate: dictionary.gridheader.approvalDate + ": #=value# (#=count#)"
             },{
               field: "documentId",
               title: dictionary.gridheader.documentId,
               width:"150px",
               filterable: { cell: {operator: "contains"}},
               groupHeaderTemplate: dictionary.gridheader.documentId + ": #=value# (#=count#)"
             },{
               field: "name",
               title: dictionary.gridheader.projectName,
               width:"250px",
               filterable: { cell: {operator: "contains"}},
               groupHeaderTemplate: dictionary.gridheader.projectName + ": #=value# (#=count#)"
             },{
               field: "projectExecutorAcronym",
               title: dictionary.gridheader.documentAcronym,
               width:"150px",
               filterable: { cell: {operator: "contains"}},
               groupHeaderTemplate: dictionary.gridheader.documentAcronym + ": #=value# (#=count#)"
             },{
               field: "mifAccess",
               title: dictionary.gridheader.access,
               width:"150px",
               groupHeaderTemplate: dictionary.gridheader.access + ": #=value# (#=count#)",
               template: function(dataItem){
                  var tmp = '';
                  if(dataItem.mifAccess){
                    tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
                  }
                  return tmp;
                }
             },{
               field: "operationFund",
               title: dictionary.gridheader.operationFund,
               width:"100px",
               groupHeaderTemplate: dictionary.gridheader.operationFund + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
             },{
               field: "operationType",
               title: dictionary.gridheader.type,
               width:"150px",
               groupHeaderTemplate: dictionary.gridheader.type + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
             },{
               field: "financingType",
               title: dictionary.gridheader.financingType,
               width:"150px",
               groupHeaderTemplate: dictionary.gridheader.financingType + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
             },{
               field: "originalApprovedAmount",
               title: dictionary.gridheader.originalApprovedAmount,
               width:"150px",
               format: '{0:c0}',
               aggregates: ["sum"],
               footerTemplate: "#= kendo.toString(sum, 'c0') #",
               groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
               attributes:{style:"text-align:right;"}
             },{
               field: "cancelledAmount",
               title: dictionary.gridheader.cancelledAmount,
               width:"150px",
               format: '{0:c0}',
               aggregates: ["sum"],
               footerTemplate: "#= kendo.toString(sum, 'c0') #",
               groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
               attributes:{style:"text-align:right;"}
             },{
               field: "increasedAmount",
               title: dictionary.gridheader.increasedAmount,
               width:"150px",
               format: '{0:c0}',
               aggregates: ["sum"],
               footerTemplate: "#= kendo.toString(sum, 'c0') #",
               groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
               attributes:{style:"text-align:right;"}
             },{
               field: "currentApprovedAmount",
               title: dictionary.gridheader.total,
               width:"150px",
               format: '{0:c0}',
               aggregates: ["sum"],
               footerTemplate: "#= kendo.toString(sum, 'c0') #",
               groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
               attributes:{style:"text-align:right;", class:"numbers"}
             },{
               field: "disbursedAmount",
               title: dictionary.gridheader.cofinancing,
               width:"150px",
               format: '{0:c0}',
               aggregates: ["sum"],
               footerTemplate: "#= kendo.toString(sum, 'c0') #",
               groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
               attributes:{style:"text-align:right;", class:"numbers"}
             },{
               field: "projectCounterpartAmount",
               title: dictionary.gridheader.counterAmount,
               width:"150px",
               format: '{0:c0}',
               attributes:{style:"text-align:right;", class:"numbers"},
               aggregates: ["count"]
             },/*{
               field: "total",
               title: dictionary.gridheader.total,
               width:"150px",
               format: '{0:c0}',
               attributes:{style:"text-align:right;"},
               aggregates: "count",
               groupHeaderTemplate: "Country: #= value # Total: #= count #"
             },*/{
               field: "designTeamleaderNm",
               title: dictionary.gridheader.designTeamLeader,
               width:"250px",
               filterable: { cell: {operator: "contains"}},
               aggregates: "count",
               groupHeaderTemplate: dictionary.gridheader.designTeamLeader + ": #=value# (#=count#)"
             },{
               field: "supervisionTeamleaderNm",
               title: dictionary.gridheader.supervisionTeamLeader,
               groupHeaderTemplate: dictionary.gridheader.supervisionTeamLeader + ": #=value# (#=count#)",
               width:"150px"
             },{
               field: "operationStatus",
               title: dictionary.gridheader.status,
               width:"150px",
               groupHeaderTemplate: dictionary.gridheader.status + ": #=value# (#=count#)",
               attributes:{style:"text-align:center;"}
              }
           ]

           /*this.childColumns = [

             {field: "operationNum", title: dictionary.gridheader.approvalNumber},
             {field: "access", title: dictionary.gridheader.access, format: "¿?",
              template: function(dataItem){
                var tmp = '';
                if(dataItem.mifAccess){
                  tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
                }
                return tmp;
              }},//"#= mifAccess + ' : ' + mifAccessname #"
             {field: "operationType", title: dictionary.gridheader.type, attributes:{style:"text-align:center;"}},
             {field: "financingType", title: dictionary.gridheader.financingType, attributes:{style:"text-align:center;"}},
             {field: "originalApprovedAmount", title: dictionary.gridheader.originalAmount, format: '{0:c0}', attributes:{style:"text-align:right;"}},
             {field: "currentApprovedAmount", title: dictionary.gridheader.currentApproved, format: '{0:c0}', attributes:{style:"text-align:right;", class:"numbers"}},
             {field: "disbursedAmount", title: dictionary.gridheader.cofinancing, format: '{0:c0}', attributes:{style:"text-align:right;", class:"numbers"}},
             {field: "supervisionTeamleaderNm", title: dictionary.gridheader.supervisionTeamLeader},
             {field: "operationStatus", title: dictionary.gridheader.status, attributes:{style:"text-align:center;"}}
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
             { field: "cancelledAmount", aggregate: "sum" },
             { field: "increasedAmount", aggregate: "sum" },
             { field: "currentApprovedAmount", aggregate: "sum" },
             { field: "disbursedAmount", aggregate: "sum" },
             { field: "projectExecutorAcronym", aggregate: "count" },
             { field: "designTeamleaderNm", aggregate: "count" }
            ];

            this.configSchema = {
                 model: {
                     fields: {
                       approvalYear: { type: "number" },
                       approvalDate: { type: "date" },
                       currentApprovedAmount: { type: "number", defaultValue:0 },
                       originalApprovedAmount: { type: "number", defaultValue:0},
                       disbursedAmount: { type: "number", defaultValue:0 }
                     }
                 }
            };

            this.configData = {projectStatus:["APR"], projectType: ["MIF"]};/*projectNumber: "CO-M1099", approvalYearFrom: ((new Date()).getFullYear() - 1)*/
            this.reportTemplate = {title: dictionary.reports.projectsApprove};

        break;
        case 'pipeline':
          this.parentColumns = [
            {
              field: "countryBeneficiaryName",
              title: dictionary.gridheader.country,
              locked: true,
              width:"100px",
              aggregates: "count",
              footerTemplate: "Total",
              //template: "#= countryBeneficiaryName === null?  coverage : countryBeneficiaryName#",
              groupHeaderTemplate: dictionary.gridheader.country + ": #=value# (#=count#)"
            },{
              field: "pipelineYear",
              title: dictionary.gridheader.pipelineYear,
              width:"100px",
              locked: true,
              attributes:{style:"text-align:center;"},
              aggregates: "count",
              groupHeaderTemplate: dictionary.gridheader.approvalYear + ": #=value# (#=count#)"
            },{
              field: "projectNum",
              title: dictionary.gridheader.projectNumber,
              locked: true,
              width:"150px",
              footerTemplate: dictionary.gridheader.projects + ": #= window.calculateProjects()#",
              groupHeaderTemplate: dictionary.gridheader.projectNumber + ": #=value# (#=count#)"
            },{
              field: "documentId",
              title: dictionary.gridheader.documentId,
              width:"150px",
              filterable: { cell: {operator: "contains"}},
              groupHeaderTemplate: dictionary.gridheader.documentId + ": #=value# (#=count#)"
            },{
              field: "name",
              title: dictionary.gridheader.projectName,
              width:"250px",
              filterable: { cell: {operator: "contains"}},
              groupHeaderTemplate: dictionary.gridheader.projectName + ": #=value# (#=count#)"
            },{
              field: "projectExecutorAcronym",
              title: dictionary.gridheader.documentAcronym,
              width:"150px",
              filterable: { cell: {operator: "contains"}},
              groupHeaderTemplate: dictionary.gridheader.documentAcronym + ": #=value# (#=count#)"
            },{
              field: "mifAccess",
              title: dictionary.gridheader.access,
              width:"200px",
              groupHeaderTemplate: dictionary.gridheader.access + ": #=value# (#=count#)",
              template: function(dataItem){
                 var tmp = '';
                 if(dataItem.mifAccess){
                   tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
                 }
                 return tmp;
               }
            },{
              field: "operationType",
              title: dictionary.gridheader.type,
              width:"150px",
              groupHeaderTemplate: dictionary.gridheader.type + ": #=value# (#=count#)",
              attributes:{style:"text-align:center;"}
            },{
              field: "financingType",
              title: dictionary.gridheader.financingType,
              width:"150px",
              groupHeaderTemplate: dictionary.gridheader.financingType + ": #=value# (#=count#)",
              attributes:{style:"text-align:center;"}
            },{
              field: "originalApprovedAmount",
              title: dictionary.gridheader.originalApprovedAmount,
              width:"150px",
              format: '{0:c0}',
              aggregates: ["sum"],
              footerTemplate: "#= kendo.toString(sum, 'c0') #",
              groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
              attributes:{style:"text-align:right;"},
              template: "#= originalApprovedAmount === null?  '$0' : kendo.toString(originalApprovedAmount, 'c0')#"
            },{
              field: "currentApprovedAmount",
              title: dictionary.gridheader.total,
              width:"150px",
              format: '{0:c0}',
              aggregates: ["sum"],
              footerTemplate: "#= kendo.toString(sum, 'c0') #",
              groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
              attributes:{style:"text-align:right;", class:"numbers"},
              template: "#= currentApprovedAmount === null?  '$0' : kendo.toString(currentApprovedAmount, 'c0')#"
            },{
              field: "disbursedAmount",
              title: dictionary.gridheader.cofinancing,
              width:"150px",
              format: '{0:c0}',
              aggregates: ["sum"],
              footerTemplate: "#= kendo.toString(sum, 'c0') #",
              groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
              attributes:{style:"text-align:right;", class:"numbers"},
              template: "#= disbursedAmount === null?  '$0' : kendo.toString(disbursedAmount, 'c0')#"
            },{
              field: "mifeDate",
              title: "MIFE",
              width:"100px",
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "pdrEventDate",
              title: "PDR",
              width:"100px",
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "qrrDate",
              title: "QRR",
              width:"100px",
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "secDate",
              title: "SEC",
              width:"100px",
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "sec2Date",
              title: "SEC 2",
              width:"100px",
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "vppDate",
              title: "VPP",
              width:"100px",
              format: "{0: dd/MMM/yyyy}"
            },{
              field: "donorsDate",
              title: "Donors commite Metting",
              width:"100px",
              format: "{0: dd/MMM/yyyy}"
             },{
              field: "distribution",
              title: "Distribution procedure",
              width:"180px",
              format: "¡Pendiente!"
            },{
              field: "operationNum",
              title: dictionary.gridheader.approvalNumber,
              width:"150px",
              footerTemplate: dictionary.gridheader.operations + ": #=count#",
              template: "#= operationNum === null?  ' ' : operationNum#"
            },{
               field: "stage",
               title: "Stage",
               width:"100px",
               attributes:{style:"text-align:center;"}
             },{
                field: "designTeamleaderNm",
                title: "Team Leader",
                width:"180px"
            }];

          /*this.childColumns = [
            {
              field: "operationNum",
              title: dictionary.gridheader.approvalNumber,
              template: "#= operationNum === null?  ' ' : operationNum#"
            },{
              field: "pipelineYear",
              title: dictionary.gridheader.pipelineYear
            },
            {field: "access", title: dictionary.gridheader.access, format: "¿?",
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
             {field: "operationType", title: dictionary.gridheader.type, attributes:{style:"text-align:center;"}},
             {field: "financingType", title: dictionary.gridheader.financingType, attributes:{style:"text-align:center;"}},
             {
               field: "originalApprovedAmount",
               title: dictionary.gridheader.originalAmount,
               attributes:{style:"text-align:right;"},
               template: "#= originalApprovedAmount === null?  '$0' : kendo.toString(originalApprovedAmount, 'c0')#"
             },
             {
               field: "currentApprovedAmount",
               title: dictionary.gridheader.currentApproved,
               attributes:{style:"text-align:right;", class:"numbers"},
               template: "#= currentApprovedAmount === null?  '$0' : kendo.toString(currentApprovedAmount, 'c0')#"
             },
             {
               field: "disbursedAmount",
               title: dictionary.gridheader.cofinancing,
               attributes:{style:"text-align:right;", class:"numbers"},
               template: "#= disbursedAmount === null?  '$0' : kendo.toString(disbursedAmount, 'c0')#"
             }
            //  {field: "supervisionTeamleaderNm", title: dictionary.gridheader.supervisionTeamLeader}
            //  {field: "operationStatus", title: dictionary.gridheader.status, attributes:{style:"text-align:center;"}}
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
            { field: "cancelledAmount", aggregate: "sum" },
            { field: "increasedAmount", aggregate: "sum" },
            { field: "currentApprovedAmount", aggregate: "sum" },
            { field: "disbursedAmount", aggregate: "sum" },
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
                     currentApprovedAmount: { type: "number", defaultValue:0 },
                     originalApprovedAmount: { type: "number", defaultValue:0},
                     disbursedAmount: { type: "number", defaultValue:0 }
                   }
               }
          };

          this.reportTemplate = {title: dictionary.reports.pipeline};
          this.configData = {projectStatus:["ON"], /*projectNumber: "RG-M1278",*/ projectType: ["MIF"], pipelineYearFrom: (new Date()).getFullYear(),  pipelineYearTo: ((new Date()).getFullYear() + 2)};
        break;
        case 'inventory':
          this.parentColumns = [
            {
              field: "projectNum",
              width:"150px",
              locked: true,
              footerTemplate: dictionary.gridheader.projects + ": #= window.calculateProjects()#",
              title: dictionary.gridheader.inventoryNumber
            },{
              field: "countryBeneficiaryName",
              title: dictionary.gridheader.country,
              width:"100px",
              locked: true,
              attributes:{style:" text-transform:uppercase;"},
              template: "#= countryBeneficiaryName === null?  projectInstitutionCountryName : countryBeneficiaryName#",
            },{
              field: "mifAccess",
              title: dictionary.gridheader.access,
              width:"200px",
              locked: true,
              template: function(dataItem){
                 var tmp = '';
                 if(dataItem.mifAccess){
                   tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
                 }
                 return tmp;
              }
            },{
              field: "name",
              title: dictionary.gridheader.projectName,
              width:"250px",
              filterable: { cell: {operator: "contains"}},
            },{
              field: "projectExecutorAcronym",
              title: dictionary.gridheader.documentAcronym,
              width:"100px",
              filterable: { cell: {operator: "contains"}},
            },{
                field: "projectType",
                width:"100px",
                title: dictionary.gridheader.projectType
            },{
              field: "financingType",
              title: dictionary.gridheader.financingType,
              width:"100px",
              attributes:{style:"text-align:center;"}
            },{
              field: "financingType",
              title: dictionary.gridheader.financingType,
              width:"150px",
              groupHeaderTemplate: dictionary.gridheader.financingType + ": #=value# (#=count#)",
              attributes:{style:"text-align:center;"}
            },{
              field: "originalApprovedAmount",
              title: dictionary.gridheader.originalApprovedAmount,
              width:"150px",
              format: '{0:c0}',
              aggregates: ["sum"],
              footerTemplate: "#= kendo.toString(sum, 'c0') === null? '$0' :  kendo.toString(sum, 'c0') #",
              groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
              attributes:{style:"text-align:right;"},
              template: "#= originalApprovedAmount === null?  '$0' : kendo.toString(originalApprovedAmount, 'c0')#"
            },{
              field: "currentApprovedAmount",
              title: dictionary.gridheader.total,
              width:"150px",
              format: '{0:c0}',
              aggregates: ["sum"],
              footerTemplate: "#= kendo.toString(sum, 'c0') === null? '$0' :  kendo.toString(sum, 'c0') #",
              groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
              attributes:{style:"text-align:right;", class:"numbers"},
              template: "#= currentApprovedAmount === null?  '$0' : kendo.toString(currentApprovedAmount, 'c0')#"
            },{
              field: "disbursedAmount",
              title: dictionary.gridheader.cofinancing,
              width:"150px",
              format: '{0:c0}',
              aggregates: ["sum"],
              footerTemplate: "#= kendo.toString(sum, 'c0') === null? '$0' :  kendo.toString(sum, 'c0') #",
              groupFooterTemplate: "#= kendo.toString(sum, 'c0') #",
              attributes:{style:"text-align:right;", class:"numbers"},
              template: "#= disbursedAmount === null?  '$0' : kendo.toString(disbursedAmount, 'c0')#"
            },{
              field: "designTeamleaderNm",
              title: dictionary.gridheader.designTeamLeader,
              width:"200px",
              filterable: { cell: {operator: "contains"}},
            }]

          /*this.childColumns = [
            {field: "operationNum", title: dictionary.gridheader.approvalNumber},
            {field: "access", title: dictionary.gridheader.access, format: "¿?",
             template: function(dataItem){
               var tmp = '';
               if(dataItem.mifAccess){
                 tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
               }
               return tmp;
             }},
            {field: "operationType", title: dictionary.gridheader.type, attributes:{style:"text-align:center;"}},
            {field: "financingType", title: dictionary.gridheader.financingType, attributes:{style:"text-align:center;"}},
            {field: "originalApprovedAmount", title: dictionary.gridheader.originalAmount, format: '{0:c0}', attributes:{style:"text-align:right;"}},
            {field: "currentApprovedAmount", title: dictionary.gridheader.currentApproved, format: '{0:c0}', attributes:{style:"text-align:right;", class:"numbers"}},
            {field: "disbursedAmount", title: dictionary.gridheader.cofinancing, format: '{0:c0}', attributes:{style:"text-align:right;", class:"numbers"}},
            {field: "supervisionTeamleaderNm", title: dictionary.gridheader.supervisionTeamLeader},
            {field: "operationStatus", title: dictionary.gridheader.status, attributes:{style:"text-align:center;"}}
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
           { field: "cancelledAmount", aggregate: "sum" },
           { field: "increasedAmount", aggregate: "sum" },
           { field: "currentApprovedAmount", aggregate: "sum" },
           { field: "disbursedAmount", aggregate: "sum" },
           { field: "projectExecutorAcronym", aggregate: "count" },
           { field: "designTeamleaderNm", aggregate: "count" }
          ];

         this.configSchema = {
              model: {
                  fields: {
                    mifeDate: { type: "date"},
                    pdrEventDate: { type: "date"},
                    originalApprovedAmount: { type: "number", defaultValue:0},
                    currentApprovedAmount: { type: "number", defaultValue:0 },
                    disbursedAmount: { type: "number", defaultValue:0 }
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
              template: "¡Pendiente!"
            },{
              field: "mifAccess",
              title: dictionary.gridheader.access,
              width:"200px",
              template: function(dataItem){
                 var tmp = '';
                 if(dataItem.mifAccess){
                   tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
                 }
                 return tmp;
              }
            },{
              field: "projectNum", title: dictionary.gridheader.projectNumber,
              aggregates: "count",
              groupHeaderTemplate: "Country: #= value # Total: #= count #"
            },{
              field: "name",
              title: dictionary.gridheader.projectName,
              filterable: { cell: {operator: "contains"}},
            },{
              field: "donorsDate",
              title: dictionary.gridheader.donorsCommittee,
              format: "{0: dd/MMM/yyyy}"
            },{
                field: "designTeamleaderNm",
                title: dictionary.gridheader.designTeamLeader,
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

    return config
  });
