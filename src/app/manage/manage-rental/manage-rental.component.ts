import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../rentals/shared/rental.service';
import { Rentals } from '../../rentals/rental.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {
  rentals: Rentals[];
  rentalDeleteIndex: number;
  public errors: any;

  constructor(
    private rentalService: RentalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.rentalService.getUserRentals().subscribe(
      (rentals: Rentals[]) => {
        this.rentals = rentals;
      },
      () => {}
    );
  }

  removeRentalFromView(rentalId: string) {
    const index = this.rentals.findIndex(rental => rental._id == rentalId);
    this.rentals.splice(index, 1);
  }

  deleteRental(rentalId: string) {
    this.rentalService.deleteRental(rentalId).subscribe(
      () => {
        this.removeRentalFromView(rentalId);
      },
      (errorsResponse: HttpErrorResponse) => {
        this.toastr.error(errorsResponse.error.errors[0].detail, 'Failed!');
      }
    );
  }
}
