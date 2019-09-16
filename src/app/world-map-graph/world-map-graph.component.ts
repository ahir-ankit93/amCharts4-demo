import { Component, OnInit } from '@angular/core';
declare var AmCharts: any;

@Component({
  selector: 'app-world-map-graph',
  templateUrl: './world-map-graph.component.html',
  styleUrls: ['./world-map-graph.component.css']
})
export class WorldMapGraphComponent implements OnInit {



  constructor() { }

  ngOnInit() {
    const map = AmCharts.makeChart('chartdiv', {
      type: 'map',
      theme: 'light',
      projection: 'miller',
      dataProvider: {
        map: 'worldLow',
        getAreasFromMap: true
      },
      areasSettings: {
        autoZoom: true,
        selectedColor: '#CC0000'
      },
      smallMap: {},
      listeners: [{
        event: 'init',
        method(e) {
          const map = e.chart;
          /**
           * Log initial zoom settings
           */
          map.initialZoom = {
            zoomLevel: e.chart.zoomLevel(),
            zoomLongitude: e.chart.zoomLongitude(),
            zoomLatitude: e.chart.zoomLatitude()
          };
        }
      }],
      export: {
        enabled: true,
        position: 'bottom-right',
        beforeCapture() {
          const map = this.setup.chart;
          /**
           * Log current zoom settings so we can restore after export
           */
          map.currentZoom = {
            zoomLevel: map.zoomLevel(),
            zoomLongitude: map.zoomLongitude(),
            zoomLatitude: map.zoomLatitude()
          };
          /**
           * Zoom to initial position
           */
          map.zoomToLongLat(map.initialZoom.zoomLevel, map.initialZoom.zoomLongitude, map.initialZoom.zoomLatitude, true);
        },
        afterCapture() {
          const map = this.setup.chart;
          setTimeout(() => {
            /**
             * Restore current zoom
             */
            map.zoomToLongLat(map.currentZoom.zoomLevel, map.currentZoom.zoomLongitude, map.currentZoom.zoomLatitude, true);
          }, 10);
        }
      }
    });
  }

}
