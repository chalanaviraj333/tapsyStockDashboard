import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcarmodelsPage } from './addcarmodels.page';

const routes: Routes = [
  {
    path: '',
    component: AddcarmodelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcarmodelsPageRoutingModule {}
