import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldMapGraphComponent } from './world-map-graph/world-map-graph.component';
import { HashrateChartComponent } from './hashrate-chart/hashrate-chart.component';
import { FoundBlocksChartComponent } from './found-blocks-chart/found-blocks-chart.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  imports: [ RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'wmgc', component: WorldMapGraphComponent },
    { path: 'hrc', component: HashrateChartComponent },
    { path: 'fbc', component: FoundBlocksChartComponent }
  ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
