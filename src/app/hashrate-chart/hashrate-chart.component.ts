import { NgZone, AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
declare var AmCharts: any;
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-hashrate-chart',
  templateUrl: './hashrate-chart.component.html',
  styleUrls: ['./hashrate-chart.component.css']
})
export class HashrateChartComponent implements OnInit, AfterViewInit, OnDestroy {


  makeBold = 'm';

  private chart: am4charts.SerialChart;

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.makeMonthChart();
  }

  ngOnInit() {  }

  ngOnDestroy() {
    this.destroyChart();
  }

  onClick(type: string){
    this.makeBold = type;
    switch (type) {
      case 'y':
        this.makeYearChart();
        break;
      case 'm':
        this.makeMonthChart();
        break;
      case 'd':
        this.makeDayChart();
        break;
      case 'w':
        this.makeWeekChart();
        break;
    }
  }


  destroyChart() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  makeYearChart(){

    am4core.useTheme(am4themes_animated);
  // Themes end
    this.destroyChart();
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Export
      chart.exporting.menu = new am4core.ExportMenu();
      chart.data =
        [
          {
            'year': '2014',
            'Total': 10,
            'Power Miners': 10
          },
          {
            'year': '2015',
            'Total': 0,
            'Power Miners': 0
          }, {
          'year': '2016',
          'Total': 20,
          'Power Miners': 15
        }, {
          'year': '2017',
          'Total': 10,
          'Power Miners': 10
        }, {
          'year': '2018',
          'Total': 30,
          'Power Miners': 20
        }, {
          'year': '2019',
          'Total': 45,
          'Power Miners': 25
        }
        ];
      chart.dateFormatter.inputDateFormat = "yyyy";
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      dateAxis.startLocation = 0.5;
      dateAxis.endLocation = 0.5;
      dateAxis.baseInterval = {
        timeUnit: "year",
        count: 1
      };
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "year";
      series.name = "Total";
      series.dataFields.valueY = "Total";
      // series.tooltipHTML = "<img src='https://www.amcharts.com/lib/3/images/car.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
      series.tooltipText = "[#000]{valueY.value}[/]";
      series.tooltip.background.fill = am4core.color("#FFF");
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.background.strokeWidth = 3;
      series.tooltip.getFillFromObject = false;
      series.fillOpacity = 0.6;
      series.strokeWidth = 2;
      series.stacked = true;
      var series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "Power Miners";
      series2.dataFields.dateX = "year";
      series2.dataFields.valueY = "Power Miners";
      // series2.tooltipHTML = "<img src='https://www.amcharts.com/lib/3/images/motorcycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
      series2.tooltipText = "[#000]{valueY.value}[/]";
      series2.tooltip.background.fill = am4core.color("#FFF");
      series2.tooltip.getFillFromObject = false;
      series2.tooltip.getStrokeFromObject = true;
      series2.tooltip.background.strokeWidth = 3;
      series2.sequencedInterpolation = true;
      series2.fillOpacity = 0.6;
      series2.stacked = true;
      series2.strokeWidth = 2;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      chart.scrollbarX = new am4core.Scrollbar();
// Add a legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
// axis ranges
      var range = dateAxis.axisRanges.create();
      range.date = new Date(2001, 1, 1);
      range.endDate = new Date(2003, 1, 1);
      range.axisFill.fill = chart.colors.getIndex(7);
      range.axisFill.fillOpacity = 0.2;
      range.label.text = "Total";
      range.label.inside = true;
      range.label.rotation = 90;
      range.label.horizontalCenter = "right";
      range.label.verticalCenter = "bottom";
      var range2 = dateAxis.axisRanges.create();
      range2.date = new Date(2007, 1, 1);
      range2.grid.stroke = chart.colors.getIndex(7);
      range2.grid.strokeOpacity = 0.6;
      range2.grid.strokeDasharray = "5,2";
      range2.label.text = "Power Miners";
      range2.label.inside = true;
      range2.label.rotation = 90;
      range2.label.horizontalCenter = "right";
      range2.label.verticalCenter = "bottom";

      this.chart = chart;
    })

  }

  makeMonthChart(){

    am4core.useTheme(am4themes_animated);
// Themes end
    this.destroyChart();
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Export
      chart.exporting.menu = new am4core.ExportMenu();

      // chart.data = [
      //   {
      //     'month': 'sep',
      //     'Total': 0,
      //     'Power Miners': 0
      //   },
      //   {
      //     'month': 'oct',
      //     'Total': 0,
      //     'Power Miners': 0
      //   }, {
      //     'month': 'nov',
      //     'Total': 20,
      //     'Power Miners': 15
      //   }, {
      //     'month': 'dec',
      //     'Total': 10,
      //     'Power Miners': 10
      //   }, {
      //     'month': 'jan',
      //     'Total': 30,
      //     'Power Miners': 20
      //   }, {
      //     'month': 'feb',
      //     'Total': 45,
      //     'Power Miners': 25
      //   }
      // ];
      chart.data =
        [
          {
            'year': '2014',
            'Total': 10,
            'Power Miners': 10
          },
          {
            'year': '2015',
            'Total': 0,
            'Power Miners': 0
          }, {
          'year': '2016',
          'Total': 20,
          'Power Miners': 15
        }, {
          'year': '2017',
          'Total': 10,
          'Power Miners': 10
        }, {
          'year': '2018',
          'Total': 30,
          'Power Miners': 20
        }, {
          'year': '2019',
          'Total': 45,
          'Power Miners': 25
        }
        ];
      chart.dateFormatter.inputDateFormat = "yyyy";
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      dateAxis.startLocation = 0.5;
      dateAxis.endLocation = 0.5;
      dateAxis.baseInterval = {
        timeUnit: "year",
        count: 1
      };
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "year";
      series.name = "Total";
      series.dataFields.valueY = "Total";
      // series.tooltipHTML = "<img src='https://www.amcharts.com/lib/3/images/car.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
      series.tooltipText = "[#000]{valueY.value}[/]";
      series.tooltip.background.fill = am4core.color("#FFF");
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.background.strokeWidth = 3;
      series.tooltip.getFillFromObject = false;
      series.fillOpacity = 0.6;
      series.strokeWidth = 2;
      series.stacked = true;
      var series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "Power Miners";
      series2.dataFields.dateX = "year";
      series2.dataFields.valueY = "Power Miners";
      // series2.tooltipHTML = "<img src='https://www.amcharts.com/lib/3/images/motorcycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
      series2.tooltipText = "[#000]{valueY.value}[/]";
      series2.tooltip.background.fill = am4core.color("#FFF");
      series2.tooltip.getFillFromObject = false;
      series2.tooltip.getStrokeFromObject = true;
      series2.tooltip.background.strokeWidth = 3;
      series2.sequencedInterpolation = true;
      series2.fillOpacity = 0.6;
      series2.stacked = true;
      series2.strokeWidth = 2;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      chart.scrollbarX = new am4core.Scrollbar();
// Add a legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
// axis ranges
      var range = dateAxis.axisRanges.create();
      range.date = new Date(2001, 1, 1);
      range.endDate = new Date(2003, 1, 1);
      range.axisFill.fill = chart.colors.getIndex(7);
      range.axisFill.fillOpacity = 0.2;
      range.label.text = "Total";
      range.label.inside = true;
      range.label.rotation = 90;
      range.label.horizontalCenter = "right";
      range.label.verticalCenter = "bottom";
      var range2 = dateAxis.axisRanges.create();
      range2.date = new Date(2007, 1, 1);
      range2.grid.stroke = chart.colors.getIndex(7);
      range2.grid.strokeOpacity = 0.6;
      range2.grid.strokeDasharray = "5,2";
      range2.label.text = "Power Miners";
      range2.label.inside = true;
      range2.label.rotation = 90;
      range2.label.horizontalCenter = "right";
      range2.label.verticalCenter = "bottom";

      this.chart = chart;
    })
}

  makeDayChart(){
    am4core.useTheme(am4themes_animated);
    // Themes end
    this.destroyChart();
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Export
      chart.exporting.menu = new am4core.ExportMenu();
      // chart.data =[
      //     {
      //       'day': 'one',
      //       'Total': 0,
      //       'Power Miners': 0
      //     },
      //     {
      //       'day': 'two',
      //       'Total': 5,
      //       'Power Miners': 10
      //     }, {
      //       'day': 'three',
      //       'Total': 20,
      //       'Power Miners': 15
      //     }, {
      //       'day': 'four',
      //       'Total': 34,
      //       'Power Miners': 24
      //     }, {
      //       'day': 'five',
      //       'Total': 25,
      //       'Power Miners': 25
      //     }, {
      //       'day': 'six',
      //       'Total': 55,
      //       'Power Miners': 45
      //     }
      //   ];

      chart.data =
        [
          {
            'year': '2014',
            'Total': 10,
            'Power Miners': 10
          },
          {
            'year': '2015',
            'Total': 0,
            'Power Miners': 0
          }, {
          'year': '2016',
          'Total': 20,
          'Power Miners': 15
        }, {
          'year': '2017',
          'Total': 10,
          'Power Miners': 10
        }, {
          'year': '2018',
          'Total': 30,
          'Power Miners': 20
        }, {
          'year': '2019',
          'Total': 45,
          'Power Miners': 25
        }
        ];
      chart.dateFormatter.inputDateFormat = "yyyy";
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      dateAxis.startLocation = 0.5;
      dateAxis.endLocation = 0.5;
      dateAxis.baseInterval = {
        timeUnit: "year",
        count: 1
      };
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "year";
      series.name = "Total";
      series.dataFields.valueY = "Total";
      // series.tooltipHTML = "<img src='https://www.amcharts.com/lib/3/images/car.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
      series.tooltipText = "[#000]{valueY.value}[/]";
      series.tooltip.background.fill = am4core.color("#FFF");
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.background.strokeWidth = 3;
      series.tooltip.getFillFromObject = false;
      series.fillOpacity = 0.6;
      series.strokeWidth = 2;
      series.stacked = true;
      var series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "Power Miners";
      series2.dataFields.dateX = "year";
      series2.dataFields.valueY = "Power Miners";
      // series2.tooltipHTML = "<img src='https://www.amcharts.com/lib/3/images/motorcycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
      series2.tooltipText = "[#000]{valueY.value}[/]";
      series2.tooltip.background.fill = am4core.color("#FFF");
      series2.tooltip.getFillFromObject = false;
      series2.tooltip.getStrokeFromObject = true;
      series2.tooltip.background.strokeWidth = 3;
      series2.sequencedInterpolation = true;
      series2.fillOpacity = 0.6;
      series2.stacked = true;
      series2.strokeWidth = 2;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      chart.scrollbarX = new am4core.Scrollbar();
// Add a legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
// axis ranges
      var range = dateAxis.axisRanges.create();
      range.date = new Date(2001, 1, 1);
      range.endDate = new Date(2003, 1, 1);
      range.axisFill.fill = chart.colors.getIndex(7);
      range.axisFill.fillOpacity = 0.2;
      range.label.text = "Total";
      range.label.inside = true;
      range.label.rotation = 90;
      range.label.horizontalCenter = "right";
      range.label.verticalCenter = "bottom";
      var range2 = dateAxis.axisRanges.create();
      range2.date = new Date(2007, 1, 1);
      range2.grid.stroke = chart.colors.getIndex(7);
      range2.grid.strokeOpacity = 0.6;
      range2.grid.strokeDasharray = "5,2";
      range2.label.text = "Power Miners";
      range2.label.inside = true;
      range2.label.rotation = 90;
      range2.label.horizontalCenter = "right";
      range2.label.verticalCenter = "bottom";

      this.chart = chart;
    })

  }

  makeWeekChart(){
    am4core.useTheme(am4themes_animated);
    // Themes end
    this.destroyChart();
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Export
      chart.exporting.menu = new am4core.ExportMenu();
      // chart.data = [
      //       {
      //         'week': 'one',
      //         'Total': 0,
      //         'Power Miners': 0
      //       },
      //       {
      //         'week': 'two',
      //         'Total': 0,
      //         'Power Miners': 0
      //       }, {
      //         'week': 'three',
      //         'Total': 20,
      //         'Power Miners': 15
      //       }, {
      //         'week': 'four',
      //         'Total': 30,
      //         'Power Miners': 20
      //       }, {
      //         'week': 'five',
      //         'Total': 20,
      //         'Power Miners': 10
      //       }, {
      //         'week': 'six',
      //         'Total': 35,
      //         'Power Miners': 15
      //       }
      //     ];
      chart.data =
        [
          {
            'year': '2014',
            'Total': 10,
            'Power Miners': 10
          },
          {
            'year': '2015',
            'Total': 0,
            'Power Miners': 0
          }, {
          'year': '2016',
          'Total': 20,
          'Power Miners': 15
        }, {
          'year': '2017',
          'Total': 10,
          'Power Miners': 10
        }, {
          'year': '2018',
          'Total': 30,
          'Power Miners': 20
        }, {
          'year': '2019',
          'Total': 45,
          'Power Miners': 25
        }
        ];
      chart.dateFormatter.inputDateFormat = "yyyy";
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      dateAxis.startLocation = 0.5;
      dateAxis.endLocation = 0.5;
      dateAxis.baseInterval = {
        timeUnit: "year",
        count: 1
      };
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "year";
      series.name = "Total";
      series.dataFields.valueY = "Total";
      // series.tooltipHTML = "<img src='https://www.amcharts.com/lib/3/images/car.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
      series.tooltipText = "[#000]{valueY.value}[/]";
      series.tooltip.background.fill = am4core.color("#FFF");
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.background.strokeWidth = 3;
      series.tooltip.getFillFromObject = false;
      series.fillOpacity = 0.6;
      series.strokeWidth = 2;
      series.stacked = true;
      var series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "Power Miners";
      series2.dataFields.dateX = "year";
      series2.dataFields.valueY = "Power Miners";
      // series2.tooltipHTML = "<img src='https://www.amcharts.com/lib/3/images/motorcycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
      series2.tooltipText = "[#000]{valueY.value}[/]";
      series2.tooltip.background.fill = am4core.color("#FFF");
      series2.tooltip.getFillFromObject = false;
      series2.tooltip.getStrokeFromObject = true;
      series2.tooltip.background.strokeWidth = 3;
      series2.sequencedInterpolation = true;
      series2.fillOpacity = 0.6;
      series2.stacked = true;
      series2.strokeWidth = 2;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      chart.scrollbarX = new am4core.Scrollbar();
// Add a legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
// axis ranges
      var range = dateAxis.axisRanges.create();
      range.date = new Date(2001, 1, 1);
      range.endDate = new Date(2003, 1, 1);
      range.axisFill.fill = chart.colors.getIndex(7);
      range.axisFill.fillOpacity = 0.2;
      range.label.text = "Total";
      range.label.inside = true;
      range.label.rotation = 90;
      range.label.horizontalCenter = "right";
      range.label.verticalCenter = "bottom";
      var range2 = dateAxis.axisRanges.create();
      range2.date = new Date(2007, 1, 1);
      range2.grid.stroke = chart.colors.getIndex(7);
      range2.grid.strokeOpacity = 0.6;
      range2.grid.strokeDasharray = "5,2";
      range2.label.text = "Power Miners";
      range2.label.inside = true;
      range2.label.rotation = 90;
      range2.label.horizontalCenter = "right";
      range2.label.verticalCenter = "bottom";

      this.chart = chart;
    })

  }




  // graphs = [
  //   {
  //     'fillAlphas': 0.5,
  //     'lineAlpha': 0.5,
  //     'title': 'Total',
  //     'valueField': 'Total',
  //     'index': 1
  //   }, {
  //     'fillAlphas': 0.5,
  //     'lineAlpha': 0.5,
  //     'title': 'Power Miners',
  //     'valueField': 'Power Miners',
  //     'index': 2
  //   }
  // ];
  //
  // chart: AmChart;
  // private categoryField: string;
  //
  // constructor() { }
  //
  // ngOnInit() {
  //
  //
  //   this.dataProvider = this.dataProviderMonth;
  //   this.categoryField = this.categoryFields;
  //
  //   AmCharts.addInitHandler(function (chart) {
  //     // Reorder chart graph's based on their "index" value
  //     chart.graphs.sort(function(a, b) {
  //       if (a.index == b.index) {
  //         return 0;
  //       }
  //       return a.index < b.index ? -1 : 1;
  //     });
  //   }, ["serial"]);
  //
  //   /**
  //    * Make the chart
  //    */
  //
  //   this.chart = AmCharts.makeChart('chartdiv', {
  //     type: 'serial',
  //     theme: 'light',
  //     legend: {
  //       align: 'center',
  //       equalWidths: false,
  //       periodValueText: 'total: [[value.sum]]',
  //       valueAlign: 'left',
  //       valueText: '[[value]] ([[percents]]%)',
  //       valueWidth: 100
  //     },
  //     valueAxes: [{
  //       stackType: 'regular',
  //       gridAlpha: 0.07,
  //       position: 'left',
  //       title: 'Hashrate'
  //     }],
  //     dataProvider: this.dataProvider,
  //     graphs: this.graphs,
  //     plotAreaBorderAlpha: 0.5,
  //     marginLeft: 0,
  //     marginBottom: 0,
  //     chartCursor: {
  //       cursorAlpha: 0,
  //       zoomable: false
  //     },
  //     categoryField: this.categoryField,
  //     categoryAxis: {
  //       startOnAxis: true,
  //       axisColor: '#DADADA',
  //       gridAlpha: 0.07
  //     }
  //   });
  // }
  //
  // onClick(type:string) {
  //
  //   if(type === "month"){
  //     this.dataProvider = this.dataProviderMonth;
  //     this.categoryFields = 'month';
  //     this.onMakeCharts();
  //   }
  //   if(type === "year"){
  //     this.dataProvider = this.dataProviderYear;
  //     this.categoryFields = 'year';
  //     this.onMakeCharts();
  //   }
  //   if(type === "week"){
  //     this.dataProvider = this.dataProviderWeek;
  //     this.categoryFields = 'week';
  //     this.onMakeCharts();
  //   }
  //   if(type === "day"){
  //     this.dataProvider = this.dataProviderDay;
  //     this.categoryFields = 'day';
  //     this.onMakeCharts();
  //   }
  // }
  //
  // onMakeCharts() {
  //   this.chart = AmCharts.AmSerialChart('chartdiv', {
  //
  //     type: 'serial',
  //     theme: 'light',
  //     legend: {
  //       align: 'center',
  //       equalWidths: false,
  //       periodValueText: 'total: [[value.sum]]',
  //       valueAlign: 'left',
  //       valueText: '[[value]] ([[percents]]%)',
  //       valueWidth: 100
  //     },
  //     valueAxes: [{
  //       stackType: 'regular',
  //       gridAlpha: 0.07,
  //       position: 'left',
  //       title: 'Hashrate'
  //     }],
  //     dataProvider: this.chart.dataProvider,
  //     graphs: this.graphs,
  //     plotAreaBorderAlpha: 0.5,
  //     marginLeft: 0,
  //     marginBottom: 0,
  //     chartCursor: {
  //       cursorAlpha: 0,
  //       zoomable: false
  //     },
  //     categoryField: this.chart.categoryField,
  //     categoryAxis: {
  //       startOnAxis: true,
  //       axisColor: '#DADADA',
  //       gridAlpha: 0.07
  //     }
  //   });
  // }

}
