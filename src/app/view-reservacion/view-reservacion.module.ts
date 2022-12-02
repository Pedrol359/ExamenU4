import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReservacionPageRoutingModule } from './view-reservacion-routing.module';

import { ViewReservacionPage } from './view-reservacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReservacionPageRoutingModule
  ],
  declarations: [ViewReservacionPage]
})
export class ViewReservacionPageModule {}
