import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmChartsModule } from '@amcharts/amcharts3-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldMapGraphComponent } from './world-map-graph/world-map-graph.component';
import { HashrateChartComponent } from './hashrate-chart/hashrate-chart.component';
import { FoundBlocksChartComponent } from './found-blocks-chart/found-blocks-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldMapGraphComponent,
    HashrateChartComponent,
    FoundBlocksChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }