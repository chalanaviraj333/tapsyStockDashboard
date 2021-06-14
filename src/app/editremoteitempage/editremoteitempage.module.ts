import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditremoteitempagePageRoutingModule } from './editremoteitempage-routing.module';

import { EditremoteitempagePage } from './editremoteitempage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditremoteitempagePageRoutingModule
  ],
  declarations: [EditremoteitempagePage]
})
export class EditremoteitempagePageModule {}
