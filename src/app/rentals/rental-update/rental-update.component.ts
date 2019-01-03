import { Component, OnInit } from '@angular/core';
import { Rentals } from '../rental.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UcWordsPipe } from 'ngx-pipes';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {
  rentalId: string;
  rental: Rentals;
  rentalCategories: string[] = Rentals.CATEGORIES;
  locationSubject: Subject<any> = new Subject();
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private rentalService: RentalService,
    private upperPipe: UcWordsPipe
  ) {
    this.transformLocation = this.transformLocation.bind(this);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.rentalId = params['rentalId'];
    });
    this.getRental(this.rentalId);
  }

  transformLocation(location: string): string {
    return this.upperPipe.transform(location);
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe((rental: Rentals) => {
      this.rental = rental;
    });
  }

  updateRental(rentalId: string, rentalData: any) {
    this.rentalService.updateDental(rentalId, rentalData).subscribe(
      (updatedRental: Rentals) => {
        this.rental = updatedRental;

        if (rentalData.city || rentalData.street) {
          this.locationSubject.next(
            this.rental.city + ', ' + this.rental.street
          );
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.errors[0].detail, 'Error');
        this.getRental(rentalId);
      }
    );
  }
  countBedroomAssets(assetsNum: number) {
    return parseInt(<any>this.rental.bedrooms || 0, 10) + assetsNum;
  }
}
