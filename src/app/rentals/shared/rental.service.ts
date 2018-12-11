import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Rentals } from '../rental.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  constructor(private http: HttpClient) {}
  private rentalsObservable = new ReplaySubject<Rentals[]>();
  private rentals: Rentals[] = [];

  // public getRentals() {
  //   this.rentalsObservable.next(this.rentals);
  //   return this.rentalsObservable.asObservable();
  // }

  public getRentals(): Observable<Rentals[]> {
    return <Observable<Rentals[]>>this.http.get('/api/rentals');
    // const rentalObervable: Observable<Rentals[]> = new Observable(observer => {
    //   observer.next(this.rentals);
    // });
    // return rentalObervable;
  }

  public getRentalById(rentalId): Observable<Rentals> {
    return <Observable<Rentals>>this.http.get('/api/rentals/' + rentalId);
    // return new Observable<Rentals>(observer => {
    //   const foundRental = this.rentals.find(rental => {
    //     return (rental.id = rentalId);
    //   });
    //   observer.next(foundRental);
    // });
  }
  public getRentalsByCity(city: string): Observable<any> {
    return this.http.get(`/api/rentals?city=${city}`);
  }

  public createRental(rental: Rentals): Observable<any> {
    return this.http.post('/api/rentals', rental);
  }

  public getUserRentals(): Observable<any> {
    return this.http.get('/api/rentals/manage');
  }

  public deleteRental(rentalId: string): Observable<any> {
    return this.http.delete(`/api/rentals/${rentalId}`);
  }

  public updateDental(rentalId: string, rentalData: any): Observable<any> {
    return this.http.patch(`/api/rentals/${rentalId}`, rentalData);
  }

  public verifyRentalUser(rentalId: string): Observable<any> {
    return this.http.get(`/api/rentals/${rentalId}/verify-user`);
  }
}
