import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorldMapGraphComponent} from './world-map-graph/world-map-graph.component';


const routes: Routes = [];

@NgModule({
  imports: [ RouterModule.forRoot([
    { path: 'wmgc', component: WorldMapGraphComponent }
  ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
