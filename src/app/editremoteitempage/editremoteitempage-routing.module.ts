import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditremoteitempagePage } from './editremoteitempage.page';

const routes: Routes = [
  {
    path: '',
    component: EditremoteitempagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditremoteitempagePageRoutingModule {}
