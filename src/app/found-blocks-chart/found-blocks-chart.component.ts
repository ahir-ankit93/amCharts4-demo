import { NgZone, AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
declare var AmCharts: any;
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-found-blocks-chart',
  templateUrl: './found-blocks-chart.component.html',
  styleUrls: ['./found-blocks-chart.component.css']
})
export class FoundBlocksChartComponent implements OnInit, AfterViewInit, OnDestroy {

  dataProvider = [
    {
      year: 2009,
      income: 23.5,
      expenses: 21.1
    }, {
      year: 2010,
      income: 26.2,
      expenses: 30.5
    }, {
      year: 2011,
      income: 30.1,
      expenses: 34.9
    }, {
      year: 2012,
      income: 29.5,
      expenses: 31.1
    }, {
      year: 2013,
      income: 30.6,
      expenses: 28.2
    },
    {
      year: 2014,
      income: 23.5,
      expenses: 21.1
    }, {
      year: 2015,
      income: 26.2,
      expenses: 30.5
    }, {
      year: 2016,
      income: 30.1,
      expenses: 34.9
    }, {
      year: 2017,
      income: 30.6,
      expenses: 28.2
    },
    {
      year: 2018,
      income: 30.6,
      expenses: 28.2,
      dashLengthLine: 5
    },
    {
      year: 2019,
      income: 34.1,
      expenses: 32.9,
      dashLengthColumn: 5,
      alpha: 0.2,
      additional: "(projection)"
    }
  ];
  dataProviderMonth = [
    {
      month: "sep",
      income: 23.5,
      expenses: 21.1
    }, {
      month: "oct",
      income: 46.2,
      expenses: 30.5
    }, {
      month: "nov",
      income: 30.1,
      expenses: 34.9
    }, {
      month: "dec",
      income: 39.5,
      expenses: 31.1
    }, {
      month: "jan",
      income: 40.6,
      expenses: 28.2
    },
    {
      month: "feb",
      income: 23.5,
      expenses: 21.1
    }, {
      month: "mar",
      income: 40.1,
      expenses: 34.9
    }
  ];

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
    this.destroyChart();
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Export
      chart.exporting.menu = new am4core.ExportMenu();

      // Data for both series
      let data = [
        {
          "year": "2009",
          "income": 13.5,
          "expenses": 8.7
        }, {
          "year": "2010",
          "income": 26.2,
          "expenses": 10.5
        }, {
          "year": "2011",
          "income": 40.1,
          "expenses": 34.9
        }, {
          "year": "2012",
          "income": 39.5,
          "expenses": 31.1
        }, {
          "year": "2013",
          "income": 30.6,
          "expenses": 28.2,
          "lineDash": "5,5",
        }, {
          "year": "2014",
          "income": 34.1,
          "expenses": 32.9,
          "strokeWidth": 1,
          "columnDash": "5,5",
          "fillOpacity": 0.2,
          "additional": "(projection)"
        }
      ];
      chart.data = data;

      /* Create axes */
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "year";
      categoryAxis.renderer.minGridDistance = 30;

      /* Create value axis */
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      /* Create series */
      let columnSeries = chart.series.push(new am4charts.ColumnSeries());
      columnSeries.name = "Income";
      columnSeries.dataFields.valueY = "income";
      columnSeries.dataFields.categoryX = "year";

      columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
      columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
      columnSeries.columns.template.propertyFields.stroke = "stroke";
      columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
      columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
      columnSeries.tooltip.label.textAlign = "middle";

      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.name = "Expenses";
      lineSeries.dataFields.valueY = "expenses";
      lineSeries.dataFields.categoryX = "year";

      lineSeries.stroke = am4core.color("#fdd400");
      lineSeries.strokeWidth = 3;
      lineSeries.propertyFields.strokeDasharray = "lineDash";
      lineSeries.tooltip.label.textAlign = "middle";

      let bullet = lineSeries.bullets.push(new am4charts.Bullet());
      bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
      bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
      let circle = bullet.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color("#fff");
      circle.strokeWidth = 3;

      this.chart = chart;
    });
  }

  makeMonthChart() {
    this.destroyChart();
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Export
      chart.exporting.menu = new am4core.ExportMenu();

      // Data for both series
      let data = [
        {
          "month": "jan",
          "income": 33.5,
          "expenses": 19.1
        }, {
          "month": "feb",
          "income": 36.2,
          "expenses": 30.5
        }, {
          "month": "mar",
          "income": 40.1,
          "expenses": 34.9
        }, {
          "month": "apr",
          "income": 49.5,
          "expenses": 31.1
        }, {
          "month": "may",
          "income": 30.6,
          "expenses": 28.2,
          "lineDash": "5,5",
        }, {
          "month": "jun",
          "income": 34.1,
          "expenses": 32.9,
          "strokeWidth": 1,
          "columnDash": "5,5",
          "fillOpacity": 0.2,
          "additional": "(projection)"
        }
      ];
      chart.data = data;

      /* Create axes */
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "month";
      categoryAxis.renderer.minGridDistance = 30;

      /* Create value axis */
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      /* Create series */
      let columnSeries = chart.series.push(new am4charts.ColumnSeries());
      columnSeries.name = "Income";
      columnSeries.dataFields.valueY = "income";
      columnSeries.dataFields.categoryX = "month";

      columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";

      columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
      columnSeries.columns.template.propertyFields.stroke = "stroke";
      columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
      columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
      columnSeries.tooltip.label.textAlign = "middle";

      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.name = "Expenses";
      lineSeries.dataFields.valueY = "expenses";
      lineSeries.dataFields.categoryX = "month";

      lineSeries.stroke = am4core.color("#fdd400");
      lineSeries.strokeWidth = 3;
      lineSeries.propertyFields.strokeDasharray = "lineDash";
      lineSeries.tooltip.label.textAlign = "middle";

      let bullet = lineSeries.bullets.push(new am4charts.Bullet());
      bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
      bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
      let circle = bullet.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color("#fff");
      circle.strokeWidth = 3;

      this.chart = chart;
    });
  }

  makeWeekChart() {
    this.destroyChart();
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Export
      chart.exporting.menu = new am4core.ExportMenu();

      // Data for both series
      let data = [
        {
          "week": "1",
          "income": 23.5,
          "expenses": 21.1
        }, {
          "week": "2",
          "income": 46.2,
          "expenses": 30.5
        }, {
          "week": "3",
          "income": 40.1,
          "expenses": 34.9
        }, {
          "week": "4",
          "income": 39.5,
          "expenses": 31.1
        }, {
          "week": "5",
          "income": 30.6,
          "expenses": 28.2,
          "lineDash": "5,5",
        }
      ];
      chart.data = data;

      /* Create axes */
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "week";
      categoryAxis.renderer.minGridDistance = 30;

      /* Create value axis */
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      /* Create series */
      let columnSeries = chart.series.push(new am4charts.ColumnSeries());
      columnSeries.name = "Income";
      columnSeries.dataFields.valueY = "income";
      columnSeries.dataFields.categoryX = "week";

      columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
      columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
      columnSeries.columns.template.propertyFields.stroke = "stroke";
      columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
      columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
      columnSeries.tooltip.label.textAlign = "middle";

      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.name = "Expenses";
      lineSeries.dataFields.valueY = "expenses";
      lineSeries.dataFields.categoryX = "week";

      lineSeries.stroke = am4core.color("#fdd400");
      lineSeries.strokeWidth = 3;
      lineSeries.propertyFields.strokeDasharray = "lineDash";
      lineSeries.tooltip.label.textAlign = "middle";

      let bullet = lineSeries.bullets.push(new am4charts.Bullet());
      bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
      bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
      let circle = bullet.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color("#fff");
      circle.strokeWidth = 3;

      this.chart = chart;
    });
  }

  makeDayChart() {
    this.destroyChart();
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Export
      chart.exporting.menu = new am4core.ExportMenu();

      // Data for both series
      let data = [
        {
          "day": "1",
          "income": 25,
          "expenses": 21.1
        }, {
          "day": "2",
          "income": 36.2,
          "expenses": 23.5
        }, {
          "day": "3",
          "income": 40.1,
          "expenses": 34.9
        }, {
          "day": "4",
          "income": 29.5,
          "expenses": 16.1
        }, {
          "day": "5",
          "income": 36.6,
          "expenses": 25.2
        }, {
          "day": "6",
          "income": 39.6,
          "expenses": 28.2,
        }, {
          "day": "7",
          "income": 45.6,
          "expenses": 38.2,
        },{
          "day": "8",
          "income": 25,
          "expenses": 21.1
        }, {
          "day": "9",
          "income": 36.2,
          "expenses": 23.5
        }, {
          "day": "10",
          "income": 40.1,
          "expenses": 34.9
        }, {
          "day": "11",
          "income": 29.5,
          "expenses": 16.1
        }
      ];
      chart.data = data;

      /* Create axes */
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "day";
      categoryAxis.renderer.minGridDistance = 30;

      /* Create value axis */
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      /* Create series */
      let columnSeries = chart.series.push(new am4charts.ColumnSeries());
      columnSeries.name = "Income";
      columnSeries.dataFields.valueY = "income";
      columnSeries.dataFields.categoryX = "day";

      columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
      columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
      columnSeries.columns.template.propertyFields.stroke = "stroke";
      columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
      columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
      columnSeries.tooltip.label.textAlign = "middle";

      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.name = "Expenses";
      lineSeries.dataFields.valueY = "expenses";
      lineSeries.dataFields.categoryX = "day";

      lineSeries.stroke = am4core.color("#fdd400");
      lineSeries.strokeWidth = 3;
      lineSeries.tooltip.label.textAlign = "middle";

      let bullet = lineSeries.bullets.push(new am4charts.Bullet());
      bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
      bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
      let circle = bullet.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color("#fff");
      circle.strokeWidth = 3;

      this.chart = chart;
    });
  }

}
