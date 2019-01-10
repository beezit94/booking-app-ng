import { Rentals } from 'src/app/rentals/rental.model';

export class Booking {
  static readonly DATE_FORMAT = 'Y/MM/DD';
  startAt: string;
  _id: number;
  endAt: string;
  totalPrice: number;
  guests: string;
  days: number;
  createdAt: string;
  rental: Rentals;
  paymentToken: any;
}
