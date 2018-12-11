import { Component, OnInit } from '@angular/core';
import { Rentals } from '../rental.model';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {
  newRental: Rentals;
  rentalCategories = Rentals.CATEGORIES;
  errors: any[] = [];
  constructor(private rentalService: RentalService, private router: Router) {}

  handleImageChange() {
    this.newRental.image =
      'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg';
  }

  ngOnInit() {
    this.newRental = new Rentals();
    this.newRental.shared = false;
  }

  createRental() {
    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rentals) => {
        this.router.navigate([`/rentals/${rental._id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
