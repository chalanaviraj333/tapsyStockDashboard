import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarmodelpagePage } from './carmodelpage.page';

const routes: Routes = [
  {
    path: '',
    component: CarmodelpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarmodelpagePageRoutingModule {}
