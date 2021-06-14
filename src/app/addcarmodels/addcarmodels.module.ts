import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcarmodelsPageRoutingModule } from './addcarmodels-routing.module';

import { AddcarmodelsPage } from './addcarmodels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcarmodelsPageRoutingModule
  ],
  declarations: [AddcarmodelsPage]
})
export class AddcarmodelsPageModule {}
