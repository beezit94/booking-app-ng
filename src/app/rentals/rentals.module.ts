import { AuthGuard } from './../auth/shared/auth-guard';
import { MapModule } from './../common/map/map.module';
import { NgModule } from '@angular/core';
import { RentalsListItemComponent } from './rentals-list-item/rentals-list-item.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalsComponent } from './rentals.component';
import { CommonModule } from '@angular/common';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { Daterangepicker } from 'ng2-daterangepicker';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
const routes: Routes = [
  {
    path: 'rentals',
    component: RentalsComponent,
    children: [
      { path: '', component: RentalListComponent },
      {
        path: 'new',
        component: RentalCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':rentalId',
        component: RentalDetailComponent
      },
      {
        path: ':city/homes',
        component: RentalSearchComponent
      }
    ]
  }
];
@NgModule({
  declarations: [
    RentalsComponent,
    RentalsListItemComponent,
    RentalListComponent,
    RentalDetailComponent,
    RentalDetailBookingComponent,
    RentalSearchComponent,
    RentalCreateComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RentalModule {}
