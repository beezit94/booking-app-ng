import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { Rentals } from '../rental.model';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {
  constructor(private rentalService: RentalService) {}

  public rentals: Rentals[] = [];

  ngOnInit() {
    this.rentalService.getRentals().subscribe((receivedRentals: Rentals[]) => {
      this.rentals = receivedRentals;
    });
  }
}
