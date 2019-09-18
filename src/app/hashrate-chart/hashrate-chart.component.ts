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
  private xAxis: any;

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

  makeYearChart() {

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
            'year': '2010',
            'Total': 10,
            'Power Miners': 10
          }, {
          'year': '2011',
          'Total': 0,
          'Power Miners': 0
        }, {
          'year': '2012',
          'Total': 20,
          'Power Miners': 15
        }, {
          'year': '2013',
          'Total': 10,
          'Power Miners': 10
        }, {
          'year': '2014',
          'Total': 10,
          'Power Miners': 10
        }, {
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
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      dateAxis.startLocation = 0.5;
      dateAxis.endLocation = 0.5;
      dateAxis.baseInterval = {
        timeUnit: "year",
        count: 1
      };
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      let series = chart.series.push(new am4charts.LineSeries());
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
      let series2 = chart.series.push(new am4charts.LineSeries());
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
      let range = dateAxis.axisRanges.create();
      range.date = new Date(2001, 1, 1);
      range.endDate = new Date(2003, 1, 1);
      range.axisFill.fill = chart.colors.getIndex(7);
      range.axisFill.fillOpacity = 0.2;
      range.label.text = "Total";
      range.label.inside = true;
      range.label.rotation = 90;
      range.label.horizontalCenter = "right";
      range.label.verticalCenter = "bottom";
      let range2 = dateAxis.axisRanges.create();
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
      chart.data = [
        {
          'date': new Date(2019, 1, 1),
          'Total': 10,
          'Power Miners': 10
        }, {
          'date': new Date(2019, 2, 1),
          'Total': 30,
          'Power Miners': 20
        }, {
          'date': new Date(2019, 3, 1),
          'Total': 20,
          'Power Miners': 15
        }, {
          'date': new Date(2019, 4, 1),
          'Total': 10,
          'Power Miners': 10
        }, {
          'date': new Date(2019, 5, 1),
          'Total': 15,
          'Power Miners': 9
        }, {
          'date': new Date(2019, 6, 1),
          'Total': 23,
          'Power Miners': 13
        }, {
          'date': new Date(2019, 7, 1),
          'Total': 20,
          'Power Miners': 15
        }, {
          'date': new Date(2019, 8, 1),
          'Total': 10,
          'Power Miners': 10
        }, {
          'date': new Date(2019, 9, 1),
          'Total': 30,
          'Power Miners': 20
        }, {
          'date': new Date(2019, 10, 1),
          'Total': 45,
          'Power Miners': 25
        }
      ];
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      dateAxis.startLocation = 0.5;
      dateAxis.endLocation = 0.5;
      dateAxis.baseInterval = {
        timeUnit: "month",
        count: 1
      };
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.name = "Total";
      series.dataFields.valueY = "Total";

      series.tooltipText = "[#000]{valueY.value}[/]";
      series.tooltip.background.fill = am4core.color("#FFF");
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.background.strokeWidth = 3;
      series.tooltip.getFillFromObject = false;
      series.fillOpacity = 0.6;
      series.strokeWidth = 2;
      series.stacked = true;
      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "Power Miners";
      series2.dataFields.dateX = "date";
      series2.dataFields.valueY = "Power Miners";

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
      let range = dateAxis.axisRanges.create();
      range.date = new Date(2019, 1, 1);
      range.endDate = new Date(2020, 1, 1);
      range.axisFill.fill = chart.colors.getIndex(7);
      range.axisFill.fillOpacity = 0.2;
      range.label.text = "Total";
      range.label.inside = true;
      range.label.rotation = 90;
      range.label.horizontalCenter = "right";
      range.label.verticalCenter = "bottom";
      let range2 = dateAxis.axisRanges.create();
      range2.date = new Date(2019, 1, 1);
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
      chart.data = [
        {
          'date': new Date(2019, 5, 1),
          'Total': 10,
          'Power Miners': 8
        }, {
          'date': new Date(2019, 5, 2),
          'Total': 12,
          'Power Miners': 10
        }, {
          'date': new Date(2019, 5, 3),
          'Total': 20,
          'Power Miners': 15
        }, {
          'date': new Date(2019, 5, 4),
          'Total': 10,
          'Power Miners': 10
        }, {
          'date': new Date(2019, 5, 5),
          'Total': 10,
          'Power Miners': 10
        }, {
          'date': new Date(2019, 5, 6),
          'Total': 0,
          'Power Miners': 0
        }, {
          'date': new Date(2019, 5, 7),
          'Total': 20,
          'Power Miners': 15
        }, {
          'date': new Date(2019, 5, 8),
          'Total': 10,
          'Power Miners': 10
        }, {
          'date': new Date(2019, 5, 9),
          'Total': 30,
          'Power Miners': 20
        }, {
          'date': new Date(2019, 5, 10),
          'Total': 45,
          'Power Miners': 25
        }
      ];

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      dateAxis.startLocation = 0.5;
      dateAxis.endLocation = 0.5;
      dateAxis.baseInterval = {
        timeUnit: "day",
        count: 1
      };
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.name = "Total";
      series.dataFields.valueY = "Total";

      series.tooltipText = "[#000]{valueY.value}[/]";
      series.tooltip.background.fill = am4core.color("#FFF");
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.background.strokeWidth = 3;
      series.tooltip.getFillFromObject = false;
      series.fillOpacity = 0.6;
      series.strokeWidth = 2;
      series.stacked = true;
      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "Power Miners";
      series2.dataFields.dateX = "date";
      series2.dataFields.valueY = "Power Miners";

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
      let range = dateAxis.axisRanges.create();
      range.date = new Date(2001, 1, 1);
      range.endDate = new Date(2003, 1, 1);
      range.axisFill.fill = chart.colors.getIndex(7);
      range.axisFill.fillOpacity = 0.2;
      range.label.text = "Total";
      range.label.inside = true;
      range.label.rotation = 90;
      range.label.horizontalCenter = "right";
      range.label.verticalCenter = "bottom";
      let range2 = dateAxis.axisRanges.create();
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
      chart.data = [
        {
          'date': new Date(2019, 4, 1),
          'Total': 10,
          'Power Miners': 8
        }, {
          'date': new Date(2019, 4, 8),
          'Total': 10,
          'Power Miners': 10
        }, {
          'date': new Date(2019, 4, 15),
          'Total': 20,
          'Power Miners': 15
        }, {
          'date': new Date(2019, 4, 22),
          'Total': 10,
          'Power Miners': 8
        }, {
          'date': new Date(2019, 4, 30),
          'Total': 30,
          'Power Miners': 20
        }, {
          'date': new Date(2019, 5, 8),
          'Total': 10,
          'Power Miners': 10
        }, {
          'date': new Date(2019, 5, 15),
          'Total': 20,
          'Power Miners': 15
        }, {
          'date': new Date(2019, 5, 22),
          'Total': 10,
          'Power Miners': 8
        }, {
          'date': new Date(2019, 5, 30),
          'Total': 30,
          'Power Miners': 20
        }
      ];

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      dateAxis.startLocation = 0.5;
      dateAxis.endLocation = 0.5;
      dateAxis.baseInterval = {
        timeUnit: "week",
        count: 1
      };
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.name = "Total";
      series.dataFields.valueY = "Total";

      series.tooltipText = "[#000]{valueY.value}[/]";
      series.tooltip.background.fill = am4core.color("#FFF");
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.background.strokeWidth = 3;
      series.tooltip.getFillFromObject = false;
      series.fillOpacity = 0.6;
      series.strokeWidth = 2;
      series.stacked = true;
      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "Power Miners";
      series2.dataFields.dateX = "date";
      series2.dataFields.valueY = "Power Miners";

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
      let range = dateAxis.axisRanges.create();
      range.date = new Date(2001, 1, 1);
      range.endDate = new Date(2003, 1, 1);
      range.axisFill.fill = chart.colors.getIndex(7);
      range.axisFill.fillOpacity = 0.2;
      range.label.text = "Total";
      range.label.inside = true;
      range.label.rotation = 90;
      range.label.horizontalCenter = "right";
      range.label.verticalCenter = "bottom";
      let range2 = dateAxis.axisRanges.create();
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


}
