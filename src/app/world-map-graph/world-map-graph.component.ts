import { NgZone, AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
declare var AmCharts: any;
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
@Component({
  selector: 'app-world-map-graph',
  templateUrl: './world-map-graph.component.html',
  styleUrls: ['./world-map-graph.component.css']
})
export class WorldMapGraphComponent implements OnInit {
  private hourglass: any;


  constructor() {
  }

  ngOnInit() {


    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    /**
     * Define SVG path for target icon
     */
    let targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

    // Create map instance
    let chart = am4core.create("chartdiv", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Exclude Antartica
    polygonSeries.exclude = ["AQ"];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.strokeOpacity = 0.5;
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.tooltipText = "{name}";

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    let button = chart.chartContainer.createChild(am4core.Button);
    button.padding(5, 5, 5, 5);
    button.width = 25;
    button.align = "right";
    button.marginRight = 15;
    button.events.on("hit", function() {
      chart.goHome();
    });
    button.icon = new am4core.Sprite();
    button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";

    // create capital markers
    let imageSeries = chart.series.push(new am4maps.MapImageSeries());

    // define template
    let imageSeriesTemplate = imageSeries.mapImages.template;
    let circle = imageSeriesTemplate.createChild(am4core.Sprite);
    circle.scale = 0.4;
    circle.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    circle.path = targetSVG;
    // what about scale...

    // set propertyfields
    imageSeriesTemplate.propertyFields.latitude = "latitude";
    imageSeriesTemplate.propertyFields.longitude = "longitude";

    imageSeriesTemplate.horizontalCenter = "middle";
    imageSeriesTemplate.verticalCenter = "middle";
    imageSeriesTemplate.align = "center";
    imageSeriesTemplate.valign = "middle";
    imageSeriesTemplate.width = 8;
    imageSeriesTemplate.height = 8;
    imageSeriesTemplate.nonScaling = true;
    // imageSeriesTemplate.tooltipText = "{title}:{status}";
    imageSeriesTemplate.tooltipHTML = `<strong>Status of Availability</strong>
                                        <hr />
                                        <table>
                                        <tr>
                                          <th align="left">City: </th>
                                          <td>{title}</td>
                                        </tr>
                                        <tr>
                                          <th align="left">Status: </th>
                                          <td>{status}</td>
                                        </tr>
                                        </table>
                                        <hr />`;

    imageSeriesTemplate.fill = am4core.color("#000");
    imageSeriesTemplate.background.fillOpacity = 0;
    imageSeriesTemplate.background.fill = am4core.color("#ffffff");
    imageSeriesTemplate.setStateOnChildren = true;
    imageSeriesTemplate.states.create("hover");

    imageSeries.data = [
      {
        "title": "Vienna",
        "status": "Available",
        "latitude": 48.2092,
        "longitude": 16.3728
      }, {
        "title": "Minsk",
        "status": "Busy",
        "latitude": 53.9678,
        "longitude": 27.5766
      }, {
        "title": "Brussels",
        "status": "Busy",
        "latitude": 50.8371,
        "longitude": 4.3676
      }, {
        "title": "Sarajevo",
        "status": "Busy",
        "latitude": 43.8608,
        "longitude": 18.4214
      }, {
        "title": "Sofia",
        "status": "Busy",
        "latitude": 42.7105,
        "longitude": 23.3238
      }, {
        "title": "Zagreb",
        "status": "Busy",
        "latitude": 45.815,
        "longitude": 15.9785
      }, {
        "title": "Pristina",
        "status": "Busy",
        "latitude": 42.666667,
        "longitude": 21.166667
      }, {
        "title": "Prague",
        "status": "Available",
        "latitude": 50.0878,
        "longitude": 14.4205
      }, {
        "title": "Copenhagen",
        "status": "Available",
        "latitude": 55.6763,
        "longitude": 12.5681
      }, {
        "title": "Tallinn",
        "status": "Available",
        "latitude": 59.4389,
        "longitude": 24.7545
      }, {
        "title": "Helsinki",
        "status": "Available",
        "latitude": 60.1699,
        "longitude": 24.9384
      }, {
        "title": "Paris",
        "status": "Available",
        "latitude": 48.8567,
        "longitude": 2.351
      }, {
        "title": "Berlin",
        "status": "Available",
        "latitude": 52.5235,
        "longitude": 13.4115
      }, {
        "title": "Athens",
        "status": "Busy",
        "latitude": 37.9792,
        "longitude": 23.7166
      }, {
        "title": "Budapest",
        "status": "Busy",
        "latitude": 47.4984,
        "longitude": 19.0408
      }, {
        "title": "Reykjavik",
        "status": "Available",
        "latitude": 64.1353,
        "longitude": -21.8952
      }, {
        "title": "Dublin",
        "latitude": 53.3441,
        "longitude": -6.2675
      }, {
        "title": "Rome",
        "status": "Available",
        "latitude": 41.8955,
        "longitude": 12.4823
      }, {
        "title": "Riga",
        "status": "Available",
        "latitude": 56.9465,
        "longitude": 24.1049
      }, {
        "title": "Vaduz",
        "status": "Available",
        "latitude": 47.1411,
        "longitude": 9.5215
      }, {
        "title": "Vilnius",
        "status": "Available",
        "latitude": 54.6896,
        "longitude": 25.2799
      }, {
        "title": "Luxembourg",
        "status": "Available",
        "latitude": 49.61,
        "longitude": 6.1296
      }, {
        "title": "Skopje",
        "status": "Available",
        "latitude": 42.0024,
        "longitude": 21.4361
      }, {
        "title": "Valletta",
        "status": "Available",
        "latitude": 35.9042,
        "longitude": 14.5189
      }, {
        "title": "Chisinau",
        "status": "Available",
        "latitude": 47.0167,
        "longitude": 28.8497
      }, {
        "title": "Monaco",
        "status": "Available",
        "latitude": 43.7325,
        "longitude": 7.4189
      }, {
        "title": "Podgorica",
        "status": "Available",
        "latitude": 42.4602,
        "longitude": 19.2595
      }, {
        "title": "Amsterdam",
        "status": "Busy",
        "latitude": 52.3738,
        "longitude": 4.891
      }, {
        "title": "Oslo",
        "status": "Busy",
        "latitude": 59.9138,
        "longitude": 10.7387
      }, {
        "title": "Warsaw",
        "status": "Busy",
        "latitude": 52.2297,
        "longitude": 21.0122
      }, {
        "title": "Lisbon",
        "status": "Busy",
        "latitude": 38.7072,
        "longitude": -9.1355
      }, {
        "title": "Bucharest",
        "status": "Busy",
        "latitude": 44.4479,
        "longitude": 26.0979
      }, {
        "title": "Moscow",
        "status": "Busy",
        "latitude": 55.7558,
        "longitude": 37.6176
      }, {
        "title": "San Marino",
        "status": "Busy",
        "latitude": 43.9424,
        "longitude": 12.4578
      }, {
        "title": "Belgrade",
        "status": "Busy",
        "latitude": 44.8048,
        "longitude": 20.4781
      }, {
        "title": "Bratislava",
        "status": "Busy",
        "latitude": 48.2116,
        "longitude": 17.1547
      }, {
        "title": "Ljubljana",
        "status": "Busy",
        "latitude": 46.0514,
        "longitude": 14.506
      }, {
        "title": "Madrid",
        "status": "Busy",
        "latitude": 40.4167,
        "longitude": -3.7033
      }, {
        "title": "Stockholm",
        "status": "Busy",
        "latitude": 59.3328,
        "longitude": 18.0645
      }, {
        "title": "Bern",
        "status": "Busy",
        "latitude": 46.948,
        "longitude": 7.4481
      }, {
        "title": "Kiev",
        "status": "Busy",
        "latitude": 50.4422,
        "longitude": 30.5367
      }, {
        "title": "London",
        "status": "Busy",
        "latitude": 51.5002,
        "longitude": -0.1262
      }, {
        "title": "Gibraltar",
        "status": "Busy",
        "latitude": 36.1377,
        "longitude": -5.3453
      }, {
        "title": "Saint Peter Port",
        "status": "Busy",
        "latitude": 49.466,
        "longitude": -2.5522
      }, {
        "title": "Douglas",
        "status": "Available",
        "latitude": 54.167,
        "longitude": -4.4821
      }, {
        "title": "Saint Helier",
        "status": "Available",
        "latitude": 49.1919,
        "longitude": -2.1071
      }, {
        "title": "Longyearbyen",
        "status": "Available",
        "latitude": 78.2186,
        "longitude": 15.6488
      }, {
        "title": "Kabul",
        "status": "Available",
        "latitude": 34.5155,
        "longitude": 69.1952
      }, {
        "title": "Yerevan",
        "status": "Available",
        "latitude": 40.1596,
        "longitude": 44.509
      }, {
        "title": "Baku",
        "status": "Available",
        "latitude": 40.3834,
        "longitude": 49.8932
      }, {
        "title": "Manama",
        "status": "Available",
        "latitude": 26.1921,
        "longitude": 50.5354
      }, {
        "title": "Dhaka",
        "status": "Available",
        "latitude": 23.7106,
        "longitude": 90.3978
      }, {
        "title": "Thimphu",
        "status": "Available",
        "latitude": 27.4405,
        "longitude": 89.673
      }, {
        "title": "Bandar Seri Begawan",
        "status": "Available",
        "latitude": 4.9431,
        "longitude": 114.9425
      }, {
        "title": "Phnom Penh",
        "status": "Available",
        "latitude": 11.5434,
        "longitude": 104.8984
      }, {
        "title": "Peking",
        "status": "Available",
        "latitude": 39.9056,
        "longitude": 116.3958
      }, {
        "title": "Nicosia",
        "status": "Available",
        "latitude": 35.1676,
        "longitude": 33.3736
      }, {
        "title": "T'bilisi",
        "status": "Available",
        "latitude": 41.701,
        "longitude": 44.793
      }, {
        "title": "New Delhi",
        "status": "Available",
        "latitude": 28.6353,
        "longitude": 77.225
      }, {
        "title": "Jakarta",
        "status": "Available",
        "latitude": -6.1862,
        "longitude": 106.8063
      }, {
        "title": "Teheran",
        "status": "Available",
        "latitude": 35.7061,
        "longitude": 51.4358
      }, {
        "title": "Baghdad",
        "status": "Available",
        "latitude": 33.3157,
        "longitude": 44.3922
      }, {
        "title": "Jerusalem",
        "status": "Available",
        "latitude": 31.76,
        "longitude": 35.17
      }, {
        "title": "Tokyo",
        "status": "Available",
        "latitude": 35.6785,
        "longitude": 139.6823
      }, {
        "title": "Amman",
        "status": "Busy",
        "latitude": 31.9394,
        "longitude": 35.9349
      }, {
        "title": "Astana",
        "status": "Busy",
        "latitude": 51.1796,
        "longitude": 71.4475
      }, {
        "title": "Kuwait",
        "status": "Busy",
        "latitude": 29.3721,
        "longitude": 47.9824
      }, {
        "title": "Bishkek",
        "status": "Busy",
        "latitude": 42.8679,
        "longitude": 74.5984
      }, {
        "title": "Vientiane",
        "status": "Busy",
        "latitude": 17.9689,
        "longitude": 102.6137
      }, {
        "title": "Beyrouth / Beirut",
        "status": "Busy",
        "latitude": 33.8872,
        "longitude": 35.5134
      }, {
        "title": "Kuala Lumpur",
        "status": "Busy",
        "latitude": 3.1502,
        "longitude": 101.7077
      }, {
        "title": "Ulan Bator",
        "status": "Busy",
        "latitude": 47.9138,
        "longitude": 106.922
      }, {
        "title": "Pyinmana",
        "status": "Busy",
        "latitude": 19.7378,
        "longitude": 96.2083
      }, {
        "title": "Kathmandu",
        "status": "Busy",
        "latitude": 27.7058,
        "longitude": 85.3157
      }, {
        "title": "Muscat",
        "status": "Busy",
        "latitude": 23.6086,
        "longitude": 58.5922
      }, {
        "title": "Islamabad",
        "status": "Busy",
        "latitude": 33.6751,
        "longitude": 73.0946
      }, {
        "title": "Manila",
        "status": "Available",
        "latitude": 14.579,
        "longitude": 120.9726
      }, {
        "title": "Doha",
        "status": "Available",
        "latitude": 25.2948,
        "longitude": 51.5082
      }, {
        "title": "Riyadh",
        "status": "Available",
        "latitude": 24.6748,
        "longitude": 46.6977
      }, {
        "title": "Singapore",
        "latitude": 1.2894,
        "longitude": 103.85
      }, {
        "title": "Seoul",
        "status": "Available",
        "latitude": 37.5139,
        "longitude": 126.9828
      }, {
        "title": "Colombo",
        "status": "Available",
        "latitude": 6.9155,
        "longitude": 79.8572
      }, {
        "title": "Damascus",
        "status": "Available",
        "latitude": 33.5158,
        "longitude": 36.2939
      }, {
        "title": "Taipei",
        "status": "Available",
        "latitude": 25.0338,
        "longitude": 121.5645
      }, {
        "title": "Dushanbe",
        "status": "Available",
        "latitude": 38.5737,
        "longitude": 68.7738
      }, {
        "title": "Bangkok",
        "status": "Available",
        "latitude": 13.7573,
        "longitude": 100.502
      }, {
        "title": "Dili",
        "status": "Available",
        "latitude": -8.5662,
        "longitude": 125.588
      }, {
        "title": "Ankara",
        "status": "Available",
        "latitude": 39.9439,
        "longitude": 32.856
      }, {
        "title": "Ashgabat",
        "status": "Available",
        "latitude": 37.9509,
        "longitude": 58.3794
      }, {
        "title": "Abu Dhabi",
        "status": "Available",
        "latitude": 24.4764,
        "longitude": 54.3705
      }, {
        "title": "Tashkent",
        "status": "Available",
        "latitude": 41.3193,
        "longitude": 69.2481
      }, {
        "title": "Hanoi",
        "status": "Available",
        "latitude": 21.0341,
        "longitude": 105.8372
      }, {
        "title": "Sanaa",
        "status": "Available",
        "latitude": 15.3556,
        "longitude": 44.2081
      }, {
        "title": "Buenos Aires",
        "status": "Available",
        "latitude": -34.6118,
        "longitude": -58.4173
      }, {
        "title": "Bridgetown",
        "status": "Available",
        "latitude": 13.0935,
        "longitude": -59.6105
      }, {
        "title": "Belmopan",
        "status": "Available",
        "latitude": 17.2534,
        "longitude": -88.7713
      }, {
        "title": "Sucre",
        "status": "Available",
        "latitude": -19.0421,
        "longitude": -65.2559
      }, {
        "title": "Brasilia",
        "status": "Available",
        "latitude": -15.7801,
        "longitude": -47.9292
      }, {
        "title": "Ottawa",
        "status": "Available",
        "latitude": 45.4235,
        "longitude": -75.6979
      }, {
        "title": "Santiago",
        "status": "Available",
        "latitude": -33.4691,
        "longitude": -70.642
      }, {
        "title": "Bogota",
        "status": "Available",
        "latitude": 4.6473,
        "longitude": -74.0962
      }, {
        "title": "San Jose",
        "status": "Available",
        "latitude": 9.9402,
        "longitude": -84.1002
      }, {
        "title": "Havana",
        "status": "Available",
        "latitude": 23.1333,
        "longitude": -82.3667
      }, {
        "title": "Roseau",
        "status": "Available",
        "latitude": 15.2976,
        "longitude": -61.39
      }, {
        "title": "Santo Domingo",
        "status": "Available",
        "latitude": 18.479,
        "longitude": -69.8908
      }, {
        "title": "Quito",
        "status": "Available",
        "latitude": -0.2295,
        "longitude": -78.5243
      }, {
        "title": "San Salvador",
        "status": "Available",
        "latitude": 13.7034,
        "longitude": -89.2073
      }, {
        "title": "Guatemala",
        "status": "Available",
        "latitude": 14.6248,
        "longitude": -90.5328
      }, {
        "title": "Ciudad de Mexico",
        "status": "Available",
        "latitude": 19.4271,
        "longitude": -99.1276
      }, {
        "title": "Managua",
        "status": "Available",
        "latitude": 12.1475,
        "longitude": -86.2734
      }, {
        "title": "Panama",
        "status": "Available",
        "latitude": 8.9943,
        "longitude": -79.5188
      }, {
        "title": "Asuncion",
        "status": "Available",
        "latitude": -25.3005,
        "longitude": -57.6362
      }, {
        "title": "Lima",
        "status": "Available",
        "latitude": -12.0931,
        "longitude": -77.0465
      }, {
        "title": "Castries",
        "status": "Available",
        "latitude": 13.9972,
        "longitude": -60.0018
      }, {
        "title": "Paramaribo",
        "status": "Available",
        "latitude": 5.8232,
        "longitude": -55.1679
      }, {
        "title": "Washington D.C.",
        "status": "Available",
        "latitude": 38.8921,
        "longitude": -77.0241
      }, {
        "title": "Montevideo",
        "status": "Available",
        "latitude": -34.8941,
        "longitude": -56.0675
      }, {
        "title": "Caracas",
        "status": "Available",
        "latitude": 10.4961,
        "longitude": -66.8983
      }, {
        "title": "Oranjestad",
        "status": "Available",
        "latitude": 12.5246,
        "longitude": -70.0265
      }, {
        "title": "Cayenne",
        "status": "Available",
        "latitude": 4.9346,
        "longitude": -52.3303
      }, {
        "title": "Plymouth",
        "status": "Available",
        "latitude": 16.6802,
        "longitude": -62.2014
      }, {
        "title": "San Juan",
        "status": "Available",
        "latitude": 18.45,
        "longitude": -66.0667
      }, {
        "title": "Algiers",
        "status": "Available",
        "latitude": 36.7755,
        "longitude": 3.0597
      }, {
        "title": "Luanda",
        "status": "Available",
        "latitude": -8.8159,
        "longitude": 13.2306
      }, {
        "title": "Porto-Novo",
        "status": "Available",
        "latitude": 6.4779,
        "longitude": 2.6323
      }, {
        "title": "Gaborone",
        "status": "Available",
        "latitude": -24.657,
        "longitude": 25.9089
      }, {
        "title": "Ouagadougou",
        "status": "Available",
        "latitude": 12.3569,
        "longitude": -1.5352
      }, {
        "title": "Bujumbura",
        "status": "Available",
        "latitude": -3.3818,
        "longitude": 29.3622
      }, {
        "title": "Yaounde",
        "status": "Available",
        "latitude": 3.8612,
        "longitude": 11.5217
      }, {
        "title": "Bangui",
        "status": "Available",
        "latitude": 4.3621,
        "longitude": 18.5873
      }, {
        "title": "Brazzaville",
        "status": "Available",
        "latitude": -4.2767,
        "longitude": 15.2662
      }, {
        "title": "Kinshasa",
        "status": "Available",
        "latitude": -4.3369,
        "longitude": 15.3271
      }, {
        "title": "Yamoussoukro",
        "status": "Available",
        "latitude": 6.8067,
        "longitude": -5.2728
      }, {
        "title": "Djibouti",
        "status": "Available",
        "latitude": 11.5806,
        "longitude": 43.1425
      }, {
        "title": "Cairo",
        "status": "Available",
        "latitude": 30.0571,
        "longitude": 31.2272
      }, {
        "title": "Asmara",
        "status": "Available",
        "latitude": 15.3315,
        "longitude": 38.9183
      }, {
        "title": "Addis Abeba",
        "status": "Available",
        "latitude": 9.0084,
        "longitude": 38.7575
      }, {
        "title": "Libreville",
        "status": "Available",
        "latitude": 0.3858,
        "longitude": 9.4496
      }, {
        "title": "Banjul",
        "status": "Available",
        "latitude": 13.4399,
        "longitude": -16.6775
      }, {
        "title": "Accra",
        "status": "Available",
        "latitude": 5.5401,
        "longitude": -0.2074
      }, {
        "title": "Conakry",
        "status": "Available",
        "latitude": 9.537,
        "longitude": -13.6785
      }, {
        "title": "Bissau",
        "status": "Available",
        "latitude": 11.8598,
        "longitude": -15.5875
      }, {
        "title": "Nairobi",
        "status": "Available",
        "latitude": -1.2762,
        "longitude": 36.7965
      }, {
        "title": "Maseru",
        "status": "Available",
        "latitude": -29.2976,
        "longitude": 27.4854
      }, {
        "title": "Monrovia",
        "status": "Available",
        "latitude": 6.3106,
        "longitude": -10.8047
      }, {
        "title": "Tripoli",
        "status": "Available",
        "latitude": 32.883,
        "longitude": 13.1897
      }, {
        "title": "Antananarivo",
        "status": "Available",
        "latitude": -18.9201,
        "longitude": 47.5237
      }, {
        "title": "Lilongwe",
        "status": "Available",
        "latitude": -13.9899,
        "longitude": 33.7703
      }, {
        "title": "Bamako",
        "status": "Available",
        "latitude": 12.653,
        "longitude": -7.9864
      }, {
        "title": "Nouakchott",
        "status": "Available",
        "latitude": 18.0669,
        "longitude": -15.99
      }, {
        "title": "Port Louis",
        "status": "Available",
        "latitude": -20.1654,
        "longitude": 57.4896
      }, {
        "title": "Rabat",
        "status": "Available",
        "latitude": 33.9905,
        "longitude": -6.8704
      }, {
        "title": "Maputo",
        "status": "Available",
        "latitude": -25.9686,
        "longitude": 32.5804
      }, {
        "title": "Windhoek",
        "status": "Available",
        "latitude": -22.5749,
        "longitude": 17.0805
      }, {
        "title": "Niamey",
        "status": "Available",
        "latitude": 13.5164,
        "longitude": 2.1157
      }, {
        "title": "Abuja",
        "status": "Available",
        "latitude": 9.058,
        "longitude": 7.4891
      }, {
        "title": "Kigali",
        "status": "Available",
        "latitude": -1.9441,
        "longitude": 30.0619
      }, {
        "title": "Dakar",
        "status": "Available",
        "latitude": 14.6953,
        "longitude": -17.4439
      }, {
        "title": "Freetown",
        "status": "Available",
        "latitude": 8.4697,
        "longitude": -13.2659
      }, {
        "title": "Mogadishu",
        "status": "Available",
        "latitude": 2.0411,
        "longitude": 45.3426
      }, {
        "title": "Pretoria",
        "status": "Available",
        "latitude": -25.7463,
        "longitude": 28.1876
      }, {
        "title": "Mbabane",
        "status": "Available",
        "latitude": -26.3186,
        "longitude": 31.141
      }, {
        "title": "Dodoma",
        "status": "Available",
        "latitude": -6.167,
        "longitude": 35.7497
      }, {
        "title": "Lome",
        "status": "Available",
        "latitude": 6.1228,
        "longitude": 1.2255
      }, {
        "title": "Tunis",
        "status": "Available",
        "latitude": 36.8117,
        "longitude": 10.1761
      }];

    chart.zoomControl = new am4maps.ZoomControl();

    chart.smallMap = new am4maps.SmallMap();
    chart.smallMap.series.push(polygonSeries);


}



    onSearchClick(searchText: any){
    console.log('button of search is clicked')
  }

}
