import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarmodelpagePageRoutingModule } from './carmodelpage-routing.module';

import { CarmodelpagePage } from './carmodelpage.page';

import { AddcarbrandPage } from '../addcarbrand/addcarbrand.page';

import { AddmodelPage } from '../addmodel/addmodel.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarmodelpagePageRoutingModule
  ],
  declarations: [CarmodelpagePage, 
    AddcarbrandPage, AddmodelPage
  ]
})
export class CarmodelpagePageModule {}
