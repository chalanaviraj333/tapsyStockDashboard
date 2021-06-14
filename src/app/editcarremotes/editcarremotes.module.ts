import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcarremotesPageRoutingModule } from './editcarremotes-routing.module';

import { EditcarremotesPage } from './editcarremotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcarremotesPageRoutingModule
  ],
  declarations: [EditcarremotesPage]
})
export class EditcarremotesPageModule {}
