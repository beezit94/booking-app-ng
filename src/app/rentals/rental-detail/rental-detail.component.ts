import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rentals } from '../rental.model';
@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {
  rentalId: string;
  rental: Rentals;
  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.rentalId = params['rentalId'];
    });
    this.rentalService
      .getRentalById(this.rentalId)
      .subscribe(receivedRental => {
        this.rental = receivedRental;
      });
  }
}
