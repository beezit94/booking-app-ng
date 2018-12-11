import { Component, OnInit, Input } from '@angular/core';
import { Rentals } from '../rental.model';
@Component({
  selector: 'app-rentals-list-item',
  templateUrl: './rentals-list-item.component.html',
  styleUrls: ['./rentals-list-item.component.scss']
})
export class RentalsListItemComponent implements OnInit {
  @Input() currentRental: Rentals[];
  constructor() {}

  ngOnInit() {}
}
