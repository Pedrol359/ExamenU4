import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReservacionPage } from './view-reservacion.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReservacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReservacionPageRoutingModule {}
