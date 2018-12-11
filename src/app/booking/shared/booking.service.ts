import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from './booking.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) {}

  public createBooking(booking: Booking): Observable<any> {
    return this.http.post('/api/booking', booking);
  }

  public getUserBookings(): Observable<any> {
    return this.http.get('/api/booking/manage');
  }
}
