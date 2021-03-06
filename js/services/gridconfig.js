'use strict';

/**
 * @ngdoc service
 * @name reportesApp.gridConfig
 * @description
 * # gridConfig
 * Factory in the reportesApp.
 */
// angular.module('ProjectsApp')
angularRoutingApp.factory('gridConfig', function() {
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
  config.reportTemplate = {};



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


  config.getFormatDate = function(date) {
    var itemDate = new Date(date.substring(0, 10));
    return ('0' + itemDate.getDate()).slice(-2) + '/' + Date.locale['en'].month_names_short[(itemDate.getMonth())] + '/' + itemDate.getFullYear();
  }




  config.columnsGrid = function(reportOption) {

    switch (reportOption) {
      case "projects":
        this.ignoreColumns = ["approvalDate", "documentId", "operationFund", "operationType", "financingType"];
        this.parentColumns = [{
          field: "countryBeneficiaryName",
          title: configuration.gridheader.country,
          locked: true,
          width: "100px",
          filterable: {
            multi: true
          },
          aggregates: "count",
          footerTemplate: "Total",
          groupHeaderTemplate: configuration.gridheader.country + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
          //groupHeaderTemplate: configuration.gridheader.country +": #= value # "+configuration.gridheader.projects+": #= window.calculateProjects(e)# "+ configuration.gridheader.operations +": #= count #"
        }, {
          field: "approvalYear",
          title: configuration.gridheader.approvalYear,
          //headerTemplate: "<strong>Name Edit</strong>",
          locked: true,
          width: "110px",
          attributes: {
            style: "text-align:center;"
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.approvalYear + ": #=value# (#=count#)"
        }, {
          field: "projectNum",
          title: configuration.gridheader.projectNumber,
          locked: true,
          width: "150px",
          aggregates: ["count"],
          footerTemplate: configuration.gridheader.projects + ": #= window.calculateProjects()#",
          groupHeaderTemplate: configuration.gridheader.projectNumber + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "operationNum",
          title: configuration.gridheader.approvalNumber,
          aggregates: ["count"],
          footerTemplate: configuration.gridheader.operations + ": #=count#",
          groupHeaderTemplate: configuration.gridheader.approvalNumber + ": #=value# (#=count#)",
          locked: true,
          width: "150px",
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "approvalDate",
          title: configuration.gridheader.approvalDate,
          format: "{0: dd-MMM-yy}",
          width: "100px",
          filterable: {
            ui: function(element) {
              element.kendoDatePicker({
                format: "dd-MMM-yy"
              });
            }
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.approvalDate + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "documentId",
          title: configuration.gridheader.documentId,
          width: "100px",
          aggregates: ["count"],
          filterable: {
            cell: {
              operator: "contains"
            }
          },
          groupHeaderTemplate: configuration.gridheader.documentId + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "name",
          title: configuration.gridheader.projectName,
          width: "250px",
          aggregates: ["count"],
          filterable: {
            cell: {
              operator: "contains"
            }
          },
          groupHeaderTemplate: configuration.gridheader.projectName + ": #=value# (#=count#)"
        }, {
          field: "projectExecutorAcronym",
          title: configuration.gridheader.documentAcronym,
          width: "120px",
          aggregates: ["count"],
          filterable: {
            cell: {
              operator: "contains"
            }
          },
          groupHeaderTemplate: configuration.gridheader.documentAcronym + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "mifAccess",
          title: configuration.gridheader.access,
          width: "150px",
          filterable: {
            multi: true
          },
          aggregates: ["count"],
          groupHeaderTemplate: configuration.gridheader.access + ": #=value# (#=count#)",
          template: function(dataItem) {
            var tmp = '';
            if (dataItem.mifAccess) {
              tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
            }
            return tmp;
          },
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "operationFund",
          title: configuration.gridheader.operationFund,
          width: "100px",
          filterable: {
            multi: true
          },
          aggregates: ["count"],
          groupHeaderTemplate: configuration.gridheader.operationFund + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "operationType",
          title: configuration.gridheader.type,
          filterable: {
            multi: true
          },
          width: "100px",
          aggregates: ["count"],
          groupHeaderTemplate: configuration.gridheader.type + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "financingType",
          title: configuration.gridheader.financingType,
          width: "120px",
          aggregates: ["count"],
          groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "originalApprovedAmount",
          title: configuration.gridheader.originalApprovedAmount,
          width: "140px",
          format: '{0:c0}',
          aggregates: ["sum"],
          footerTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
          groupFooterTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
          template: "<span style='float:left;'>$</span>#= originalApprovedAmount === null?  '0' : kendo.toString(originalApprovedAmount, 'n0')#",
          attributes: {
            style: "text-align:right;"
          }
        }, {
          field: "approvedCounterpart",
          title: configuration.gridheader.counterAmount,
          width: "140px",
          aggregates: ["sum"],
          footerTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
          groupFooterTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
          template: "<span style='float:left;'>$</span>#= approvedCounterpart === null?  '0' : kendo.toString(approvedCounterpart, 'n0')#",
          attributes: {
            style: "text-align:right;",
            class: "numbers"
          }
        }, {
          field: "designTeamleaderNm",
          title: configuration.gridheader.designTeamLeader,
          width: "180px",
          filterable: {
            cell: {
              operator: "contains"
            }
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.designTeamLeader + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "supervisionTeamleaderNm",
          title: configuration.gridheader.supervisionTeamLeader,
          aggregates: ["count"],
          groupHeaderTemplate: configuration.gridheader.supervisionTeamLeader + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          },
          width: "180px"
        }, {
          field: "operationStatus",
          title: configuration.gridheader.status,
          filterable: {
            multi: true
          },
          width: "100px",
          aggregates: ["count"],
          groupHeaderTemplate: configuration.gridheader.status + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
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
            }},//"#= mifAccess + ' : ' + mifAccessname #"
           {field: "operationType", title: configuration.gridheader.type, attributes:{style:"text-align:center;"}},
           {field: "financingType", title: configuration.gridheader.financingType, attributes:{style:"text-align:center;"}},
           {field: "originalApprovedAmount", title: configuration.gridheader.originalAmount, format: '{0:c0}', attributes:{style:"text-align:right;"}},
           {field: "currentApprovedAmount", title: configuration.gridheader.currentApproved, format: '{0:c0}', attributes:{style:"text-align:right;", class:"numbers"}},
           {field: "disbursedAmount", title: configuration.gridheader.cofinancing, format: '{0:c0}', attributes:{style:"text-align:right;", class:"numbers"}},
           {field: "supervisionTeamleaderNm", title: configuration.gridheader.supervisionTeamLeader},
           {field: "operationStatus", title: configuration.gridheader.status, attributes:{style:"text-align:center;"}}
        ];*/

        this.gridAggregates = [{
          field: "countryBeneficiary",
          aggregate: "count"
        }, {
          field: "projectNum",
          aggregate: "count"
        }, {
          field: "operationNum",
          aggregate: "count"
        }, {
          field: "approvalYear",
          aggregate: "count"
        }, {
          field: "approvalDate",
          aggregate: "count"
        }, {
          field: "name",
          aggregate: "count"
        }, {
          field: "documentId",
          aggregate: "count"
        }, {
          field: "originalApprovedAmount",
          aggregate: "sum"
        }, {
          field: "approvedCounterpart",
          aggregate: "sum"
        }, {
          field: "projectExecutorAcronym",
          aggregate: "count"
        }, {
          field: "designTeamleaderNm",
          aggregate: "count"
        }];

        this.configSchema = {
          model: {
            fields: {
              approvalYear: {
                type: "number"
              },
              approvalDate: {
                type: "date"
              },
              originalApprovedAmount: {
                type: "number",
                defaultValue: 0
              },
            }
          }
        };

        this.configData = {
          status: ["APR"],
          projectType: ["MIF"]        
        }; /*projectNumber: "CO-M1099", approvalYearFrom: ((new Date()).getFullYear() - 1)*/
        this.reportTemplate = {
          title: configuration.menu.approvedProjects
        };

        break;
      case 'pipeline':
        this.ignoreColumns = ["operationType", "financingType", "pdrEventDate", "sec2Date", "vppDate", "documentId", "operationNum"];
        this.parentColumns = [{
            field: "countryBeneficiaryName",
            title: configuration.gridheader.country,
            filterable: {
              multi: true
            },
            locked: true,
            width: "100px",
            aggregates: "count",
            footerTemplate: "Total",
            groupHeaderTemplate: configuration.gridheader.country + ": #=value# (#=count#)",
            attributes: {
              style: "text-align:center;"
            }
          }, {
            field: "pipelineYear",
            title: configuration.gridheader.pipelineYear,
            width: "100px",
            locked: true,
            attributes: {
              style: "text-align:center;"
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.approvalYear + ": #=value# (#=count#)"
          }, {
            field: "projectNum",
            title: configuration.gridheader.projectNumber,
            locked: true,
            width: "120px",
            attributes: {
              style: "text-align:center;"
            },
            aggregates: "count",
            //footerTemplate: configuration.gridheader.operations + ": #=count#",
            footerTemplate: configuration.gridheader.projects + ": #= window.calculateProjects()#",
            groupHeaderTemplate: configuration.gridheader.projectNumber + ": #=value# (#=count#)"
          }, {
            field: "name",
            title: configuration.gridheader.projectName,
            width: "250px",
            filterable: {
              cell: {
                operator: "contains"
              }
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.projectName + ": #=value# (#=count#)"
          }, {
            field: "projectExecutorAcronym",
            title: configuration.gridheader.documentAcronym,
            width: "120px",
            attributes: {
              style: "text-align:center;"
            },
            filterable: {
              cell: {
                operator: "contains"
              }
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.documentAcronym + ": #=value# (#=count#)"
          }, {
            field: "mifAccess",
            title: configuration.gridheader.access,
            width: "150px",
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.access + ": #=value# (#=count#)",
            attributes: {
              style: "text-align:center;"
            },
            template: function(dataItem) {
              var tmp = '';
              if (dataItem.mifAccess) {
                tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
              }
              return tmp;
            }
          }, {
            field: "operationType",
            title: configuration.gridheader.type,
            filterable: {
              multi: true
            },
            width: "100px",
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.type + ": #=value# (#=count#)",
            attributes: {
              style: "text-align:center;"
            }
          }, {
            field: "financingType",
            title: configuration.gridheader.financingType,
            filterable: {
              multi: true
            },
            width: "120px",
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
            attributes: {
              style: "text-align:center;"
            }
          }, {
            field: "projectOriginalApprovedAmount",
            title: configuration.gridheader.originalApprovedAmount,
            width: "150px",
            aggregates: ["sum"],
            footerTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
            groupFooterTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
            attributes: {
              style: "text-align:right;"
            },
            template: "<span style='float:left;'>$</span>#= projectOriginalApprovedAmount === null?  '0' : kendo.toString(projectOriginalApprovedAmount, 'n0')#"
              //template: "#= originalApprovedAmount === null?  '$0' : kendo.toString(originalApprovedAmount, 'c0')#"
          }, {
            field: "projectCounterpartAmount",
            title: configuration.gridheader.counterAmount,
            width: "150px",
            aggregates: ["sum"],
            footerTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
            groupFooterTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
            attributes: {
              style: "text-align:right;",
              class: "numbers"
            },
            template: "<span style='float:left;'>$</span>#= projectCounterpartAmount === null?  '0' : kendo.toString(projectCounterpartAmount, 'n0')#"
          }, {
            field: "mifeDate",
            title: "MIFE",
            width: "100px",
            /*filterable: {
              ui: function(element) {
                element.kendoDatePicker({
                  format: "dd-MMM-yy"
                });
              }
            },*/
            attributes: {
              style: "text-align:center;"
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
            format: "{0:dd-MMM-yy}"
          }, {
            field: "pdrEventDate",
            title: "PDR",
            width: "100px",
            filterable: {
              ui: function(element) {
                element.kendoDatePicker({
                  format: "dd-MMM-yy"
                });
              }
            },
            attributes: {
              style: "text-align:center;"
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
            format: "{0:dd-MMM-yy}"
          }, {
            field: "qrrDate",
            title: "QRR",
            width: "100px",
            attributes: {
              style: "text-align:center;"
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
            format: "{0: dd-MMM-yy}"
          }, {
            field: "secDate",
            title: "SEC",
            width: "100px",
            attributes: {
              style: "text-align:center;"
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
            format: "{0: dd-MMM-yy}"
          }, {
            field: "sec2Date",
            title: "SEC 2",
            width: "100px",
            attributes: {
              style: "text-align:center;"
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
            format: "{0: dd-MMM-yy}"
          }, {
            field: "vppDate",
            title: "VPP",
            width: "100px",
            attributes: {
              style: "text-align:center;"
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
            format: "{0: dd-MMM-yy}"
          }, {
            field: "donorsDate",
            title: configuration.gridheader.donorsCommittee,
            width: "100px",
            attributes: {
              style: "text-align:center;"
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
            format: "{0: dd-MMM-yy}"
          },
          /*{
                               field: "distribution",
                               title: "Distribution procedure",
                               width: "180px",
                               attributes: {
                                   style: "text-align:center;"
                               },
                               aggregates: "count",
                               groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
                               format: "¡Pendiente!"
                           }, */
          {
            field: "documentId",
            title: configuration.gridheader.documentId,
            width: "120px",
            filterable: {
              cell: {
                operator: "contains"
              }
            },
            attributes: {
              style: "text-align:center;"
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.documentId + ": #=value# (#=count#)"
          },
          /* {
                      field: "operationNum",
                      title: configuration.gridheader.approvalNumber,
                      width: "150px",
                      attributes: {
                        style: "text-align:center;"
                      },
                      aggregates: "count",
                      groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
                      template: "#= operationNum === null?  ' ' : operationNum#"
                    }, */
          {
            field: "stage",
            title: "Stage",
            filterable: {
              //ui: window.stageFilter
              multi: true
            },
            width: "90px",
            aggregates: "count",
            //groupHeaderTemplate: "Stage : #=value# (#=count#)",
            attributes: {
              style: "text-align:center;"
            }
          }, {
            field: "designTeamleaderNm",
            title: "Team Leader",
            attributes: {
              style: "text-align:center;"
            },
            aggregates: "count",
            groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)",
            width: "180px"
          }
        ];

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
        this.gridAggregates = [{
            field: "countryBeneficiary",
            aggregate: "count"
          }, {
            field: "projectNum",
            aggregate: "count"
          },
          /*{
                     field: "operationNum",
                     aggregate: "count"
                   }, */
          {
            field: "approvalYear",
            aggregate: "count"
          }, {
            field: "approvalDate",
            aggregate: "count"
          }, {
            field: "name",
            aggregate: "count"
          }, {
            field: "documentId",
            aggregate: "count"
          }, {
            field: "projectOriginalApprovedAmount",
            aggregate: "sum"
          }, {
            field: "stage",
            aggregate: "count"
          }, {
            field: "projectCounterpartAmount",
            aggregate: "sum"
          }, {
            field: "projectExecutorAcronym",
            aggregate: "count"
          }, {
            field: "designTeamleaderNm",
            aggregate: "count"
          }
          /*,{
                              field: "distribution",
                              aggregate: "count"
                            }*/
        ];

        this.configSchema = {
          model: {
            fields: {
              pipelineYear: {
                type: "number"
              },
              mifeDate: {
                type: "date",
                parse: function(e) {
                  return kendo.parseDate(e, "dd-MMM-yy");
                }
              },
              pdrEventDate: {
                type: "date",
                parse: function(e) {
                  return kendo.parseDate(e, "dd-MMM-yy");
                }
              },
              qrrDate: {
                type: "date"
              },
              secDate: {
                type: "date"
              },
              sec2Date: {
                type: "date"
              },
              vppDate: {
                type: "date"
              },
              donorsDate: {
                type: "date"
              },
              /*distribution: {
                  defaultValue: {
                      DistributionID: 1,
                      DistributionName: "Standard - For Consideration"
                  }
              },*/
              projectOriginalApprovedAmount: {
                type: "number",
                defaultValue: 0
              }
            }
          }
        };

        this.reportTemplate = {
          title: configuration.menu.pipelineProjects
        };
        this.configData = {
          status: ["ON"],
          /*projectNumber: "RG-M1278",*/
          projectType: ["MIF"],
          pipelineYearFrom: (new Date()).getFullYear(),
          pipelineYearTo: ((new Date()).getFullYear() + 2)
        };
        break;
      case 'inventory':
        this.ignoreColumns = [];
        this.parentColumns = [{
          field: "projectNum",
          title: configuration.gridheader.inventoryNumber,
          width: "150px",
          attributes: {
            style: "text-align:center;"
          },
          footerTemplate: configuration.gridheader.projects + ": #= window.calculateProjects()#",
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.inventoryNumber + ": #=value# (#=count#)"
        }, {
          field: "countryBeneficiaryName",
          title: configuration.gridheader.country,
          filterable: {
            multi: true
          },
          width: "100px",
          attributes: {
            style: "text-align:center;"
          },
          template: "#= countryBeneficiaryName === null?  projectInstitutionCountryName : countryBeneficiaryName#",
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.country + ": #=value# (#=count#)"
        }, {
          field: "mifAccess",
          title: configuration.gridheader.access,
          filterable: {
            multi: true
          },
          width: "200px",
          attributes: {
            style: "text-align:center;"
          },
          template: function(dataItem) {
            var tmp = '';
            if (dataItem.mifAccess) {
              tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
            }
            return tmp;
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.access + ": #=value# (#=count#)"
        }, {
          field: "name",
          title: configuration.gridheader.projectName,
          filterable: {
            cell: {
              operator: "contains"
            }
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.projectName + ": #=value# (#=count#)"
        }, {
          field: "projectExecutorAcronym",
          title: configuration.gridheader.documentAcronym,
          attributes: {
            style: "text-align:center;"
          },
          filterable: {
            cell: {
              operator: "contains"
            }
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.documentAcronym + ": #=value# (#=count#)"
        }, {
          field: "projectType",
          title: configuration.gridheader.projectType,
          filterable: {
            multi: true
          },
          width: "100px",
          attributes: {
            style: "text-align:center;"
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.projectType + ": #=value# (#=count#)"
        }, {
          field: "financingType",
          title: configuration.gridheader.financingType,
          filterable: {
            multi: true
          },
          width: "150px",
          attributes: {
            style: "text-align:center;"
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.financingType + ": #=value# (#=count#)"
        }, {
          field: "originalApprovedAmount",
          title: configuration.gridheader.originalApprovedAmount,
          width: "150px",
          aggregates: ["sum"],
          footerTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
          template: "<span style='float:left;'>$</span>#= originalApprovedAmount === null?  '0' : kendo.toString(originalApprovedAmount, 'n0')#",
          groupFooterTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
          attributes: {
            style: "text-align:right;"
          }
        }, {
          field: "approvedCounterpart",
          title: configuration.gridheader.counterAmount,
          width: "150px",
          aggregates: ["sum"],
          footerTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
          template: "<span style='float:left;'>$</span>#= approvedCounterpart === null?  '0' : kendo.toString(approvedCounterpart, 'n0')#",
          groupFooterTemplate: "<span style='float:left;'>$</span>#= kendo.toString(sum, 'n0')#",
          attributes: {
            style: "text-align:right;",
            class: "numbers"
          }
        }, {
          field: "designTeamleaderNm",
          title: configuration.gridheader.designTeamLeader,
          width: "200px",
          filterable: {
            cell: {
              operator: "contains"
            }
          },
          attributes: {
            style: "text-align:center;"
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.designTeamLeader + ": #=value# (#=count#)"
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
        this.gridAggregates = [{
          field: "countryBeneficiary",
          aggregate: "count"
        }, {
          field: "projectNum",
          aggregate: "average"
        }, {
          field: "operationNum",
          aggregate: "count"
        }, {
          field: "approvalYear",
          aggregate: "count"
        }, {
          field: "approvalDate",
          aggregate: "count"
        }, {
          field: "name",
          aggregate: "count"
        }, {
          field: "documentId",
          aggregate: "count"
        }, {
          field: "originalApprovedAmount",
          aggregate: "sum"
        }, {
          field: "approvedCounterpart",
          aggregate: "sum"
        }, {
          field: "projectExecutorAcronym",
          aggregate: "count"
        }, {
          field: "designTeamleaderNm",
          aggregate: "count"
        }];

        this.configSchema = {
          model: {
            fields: {
              mifeDate: {
                type: "date"
              },
              pdrEventDate: {
                type: "date"
              },
              originalApprovedAmount: {
                type: "number",
                defaultValue: 0
              },
              approvedCounterpart: {
                type: "number",
                defaultValue: 0
              }
            }
          }
        };

        this.configData = {
          projectType: ["SMP"],
          status: ["INV"]
        };

        this.reportTemplate = {
          title: configuration.menu.inventoryProjects
        };
        break;


      case 'donors':
        this.parentColumns = [{
          field: "mifAccess",
          title: configuration.gridheader.access,
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.access + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          },
          template: function(dataItem) {
            var tmp = '';
            if (dataItem.mifAccess) {
              tmp = dataItem.mifAccess + ' : ' + dataItem.mifAccessname;
            }
            return tmp;
          }
        }, {
          field: "pipelineYear",
          title: configuration.gridheader.pipelineYear,
          attributes: {
            style: "text-align:center;"
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.approvalYear + ": #=value# (#=count#)"

        }, {
          field: "projectNum",
          title: configuration.gridheader.projectNumber,
          aggregates: ["count"],
          footerTemplate: configuration.gridheader.projects + ": #= window.calculateProjects()#",
          groupHeaderTemplate: configuration.gridheader.projectNumber + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "name",
          title: configuration.gridheader.projectName,
          aggregates: ["count"],
          filterable: {
            cell: {
              operator: "contains"
            }
          },
          groupHeaderTemplate: configuration.gridheader.projectName + ": #=value# (#=count#)"
        }, {
          field: "donorsDate",
          title: configuration.gridheader.donorsCommittee,
          format: "{0: dd-MMM-yy}",
          filterable: {
            ui: function(element) {
              element.kendoDatePicker({
                format: "dd-MMM-yy"
              });
            }
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.approvalDate + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
        }, {
          field: "designTeamleaderNm",
          title: configuration.gridheader.designTeamLeader,
          filterable: {
            cell: {
              operator: "contains"
            }
          },
          aggregates: "count",
          groupHeaderTemplate: configuration.gridheader.designTeamLeader + ": #=value# (#=count#)",
          attributes: {
            style: "text-align:center;"
          }
        }];

        this.gridAggregates = [{
          field: "mifAccess",
          aggregate: "count"
        }, {
          field: "projectNum",
          aggregate: "count"
        }, {
          field: "pipelineYear",
          aggregate: "count"
        }, {
          field: "name",
          aggregate: "count"
        }, {
          field: "donorsDate",
          aggregate: "count"
        }, {
          field: "designTeamleaderNm",
          aggregate: "count"
        }];

        this.configSchema = {
          model: {
            fields: {
              donorsDate: {
                type: "date"
              },
              pipelineYear: {
                type: "number"
              }
            }
          }
        };

        this.configData = {
          projectType: ["MIF"],
          status: ["DM"],
          pipelineYearFrom: (new Date()).getFullYear(),
          pipelineYearTo: ((new Date()).getFullYear() + 2)
        };

        /*this.configData = {
          status: ["ON"],
          projectType: ["MIF"],
          pipelineYearFrom: (new Date()).getFullYear(),
          pipelineYearTo: ((new Date()).getFullYear() + 2)
        };*/

        this.reportTemplate = {
          title: configuration.menu.donorsProjects
        };
        break;
    }
  }

  return config;
});
