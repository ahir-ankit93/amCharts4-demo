import { Component, OnInit } from '@angular/core';
import {AmChart} from '@amcharts/amcharts3-angular';
declare var AmCharts: any;

@Component({
  selector: 'app-hashrate-chart',
  templateUrl: './hashrate-chart.component.html',
  styleUrls: ['./hashrate-chart.component.css']
})
export class HashrateChartComponent implements OnInit {


  categoryFields = 'month';
  dataProvider = [];
  dataProviderYear = [
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
  dataProviderMonth = [
    {
      'month': 'sep',
      'Total': 0,
      'Power Miners': 0
    },
    {
      'month': 'oct',
      'Total': 0,
      'Power Miners': 0
    }, {
      'month': 'nov',
      'Total': 20,
      'Power Miners': 15
    }, {
      'month': 'dec',
      'Total': 10,
      'Power Miners': 10
    }, {
      'month': 'jan',
      'Total': 30,
      'Power Miners': 20
    }, {
      'month': 'feb',
      'Total': 45,
      'Power Miners': 25
    }
  ];
  dataProviderWeek = [
    {
      'week': 'one',
      'Total': 0,
      'Power Miners': 0
    },
    {
      'week': 'two',
      'Total': 0,
      'Power Miners': 0
    }, {
      'week': 'three',
      'Total': 20,
      'Power Miners': 15
    }, {
      'week': 'four',
      'Total': 30,
      'Power Miners': 20
    }, {
      'week': 'five',
      'Total': 20,
      'Power Miners': 10
    }, {
      'week': 'six',
      'Total': 35,
      'Power Miners': 15
    }
  ];
  dataProviderDay = [
    {
      'day': 'one',
      'Total': 0,
      'Power Miners': 0
    },
    {
      'day': 'two',
      'Total': 5,
      'Power Miners': 10
    }, {
      'day': 'three',
      'Total': 20,
      'Power Miners': 15
    }, {
      'day': 'four',
      'Total': 34,
      'Power Miners': 24
    }, {
      'day': 'five',
      'Total': 25,
      'Power Miners': 25
    }, {
      'day': 'six',
      'Total': 55,
      'Power Miners': 45
    }
  ];
  graphs = [
    {
      'fillAlphas': 0.5,
      'lineAlpha': 0.5,
      'title': 'Total',
      'valueField': 'Total',
      'index': 1
    }, {
      'fillAlphas': 0.5,
      'lineAlpha': 0.5,
      'title': 'Power Miners',
      'valueField': 'Power Miners',
      'index': 2
    }
  ];

  chart: AmChart;
  private categoryField: string;

  constructor() { }

  ngOnInit() {


    this.dataProvider = this.dataProviderMonth;
    this.categoryField = this.categoryFields;

    AmCharts.addInitHandler(function (chart) {
      // Reorder chart graph's based on their "index" value
      chart.graphs.sort(function(a, b) {
        if (a.index == b.index) {
          return 0;
        }
        return a.index < b.index ? -1 : 1;
      });
    }, ["serial"]);

    /**
     * Make the chart
     */

    this.chart = AmCharts.makeChart('chartdiv', {
      type: 'serial',
      theme: 'light',
      legend: {
        align: 'center',
        equalWidths: false,
        periodValueText: 'total: [[value.sum]]',
        valueAlign: 'left',
        valueText: '[[value]] ([[percents]]%)',
        valueWidth: 100
      },
      valueAxes: [{
        stackType: 'regular',
        gridAlpha: 0.07,
        position: 'left',
        title: 'Hashrate'
      }],
      dataProvider: this.dataProvider,
      graphs: this.graphs,
      plotAreaBorderAlpha: 0.5,
      marginLeft: 0,
      marginBottom: 0,
      chartCursor: {
        cursorAlpha: 0,
        zoomable: false
      },
      categoryField: this.categoryField,
      categoryAxis: {
        startOnAxis: true,
        axisColor: '#DADADA',
        gridAlpha: 0.07
      }
    });
  }

  onClick(type:string) {

    if(type === "month"){
      this.dataProvider = this.dataProviderMonth;
      this.categoryFields = 'month';
      this.onMakeCharts();
    }
    if(type === "year"){
      this.dataProvider = this.dataProviderYear;
      this.categoryFields = 'year';
      this.onMakeCharts();
    }
    if(type === "week"){
      this.dataProvider = this.dataProviderWeek;
      this.categoryFields = 'week';
      this.onMakeCharts();
    }
    if(type === "day"){
      this.dataProvider = this.dataProviderDay;
      this.categoryFields = 'day';
      this.onMakeCharts();
    }
  }

  onMakeCharts() {
    this.chart = AmCharts.AmSerialChart('chartdiv', {

      type: 'serial',
      theme: 'light',
      legend: {
        align: 'center',
        equalWidths: false,
        periodValueText: 'total: [[value.sum]]',
        valueAlign: 'left',
        valueText: '[[value]] ([[percents]]%)',
        valueWidth: 100
      },
      valueAxes: [{
        stackType: 'regular',
        gridAlpha: 0.07,
        position: 'left',
        title: 'Hashrate'
      }],
      dataProvider: this.chart.dataProvider,
      graphs: this.graphs,
      plotAreaBorderAlpha: 0.5,
      marginLeft: 0,
      marginBottom: 0,
      chartCursor: {
        cursorAlpha: 0,
        zoomable: false
      },
      categoryField: this.chart.categoryField,
      categoryAxis: {
        startOnAxis: true,
        axisColor: '#DADADA',
        gridAlpha: 0.07
      }
    });
  }

}
