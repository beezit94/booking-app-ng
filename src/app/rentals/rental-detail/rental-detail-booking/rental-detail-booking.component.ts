import { HelperService } from './../../../common/service/helper.service';
import { Booking } from './../../../booking/shared/booking.model';
import { Rentals } from './../../rental.model';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/booking/shared/booking.service';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rentals;
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;
  newBooking: Booking;
  modalRef: any;
  bookedOutDates: any[] = [];
  errors: any[] = [];

  public options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'right',
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(
    private helper: HelperService,
    private modalService: NgbModal,
    private bookingService: BookingService,
    private toastr: ToastrService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getBookedOutDates();
    this.newBooking = new Booking();
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(
      this.helper.formatBookingDate(date) || date.diff(moment(), 'days') < 0
    );
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;
    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(
          booking.startAt,
          booking.endAt
        );
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  private addNewBookedDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(
      bookingData.startAt,
      bookingData.endAt
    );
    this.bookedOutDates.push(...dateRange);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }
  createBooking() {
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData: any) => {
        this.addNewBookedDates(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success(
          'Booking has been succesfuly created, check your booking detail in manage section',
          'Success!'
        );
      },
      (errorResponse: any) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  public daterange: any = {};

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers

  public selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -value.start.diff(value.end, 'days');
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }
}
