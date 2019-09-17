import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmChartsModule } from '@amcharts/amcharts3-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldMapGraphComponent } from './world-map-graph/world-map-graph.component';
import { HashrateChartComponent } from './hashrate-chart/hashrate-chart.component';
import { FoundBlocksChartComponent } from './found-blocks-chart/found-blocks-chart.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WorldMapGraphComponent,
    HashrateChartComponent,
    FoundBlocksChartComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmChartsModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
