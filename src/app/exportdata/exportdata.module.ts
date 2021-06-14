import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportdataPageRoutingModule } from './exportdata-routing.module';

import { ExportdataPage } from './exportdata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportdataPageRoutingModule
  ],
  declarations: [ExportdataPage]
})
export class ExportdataPageModule {}
