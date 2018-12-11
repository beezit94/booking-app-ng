import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapObservable = new ReplaySubject<any>();

  constructor(private camelizePipe: CamelizePipe) {}

  private geoCoder;
  private cachedLocation: any = {};

  private camelize(value: string): string {
    return this.camelizePipe.transform(value);
  }
  private cacheLocation(location: string, coordinates: any) {
    const camelizedLocation = this.camelize(location);
    this.cachedLocation[camelizedLocation] = coordinates;
  }

  private isLocationCached(location): boolean {
    return this.cachedLocation[this.camelize(location)];
  }

  // public geocodeLocation(location: string): Observable<any> {
  //   this.geoCoder = new (<any>window).google.maps.Geocoder();

  //   if (this.isLocationCahed(location)) {
  //     this.mapObservable.next(this.cachedLocation[this.camelize(location)]);
  //     return this.mapObservable.asObservable();
  //   } else {
  //     this.geoCoder.geocode({ address: location }, (result, status) => {
  //       if (status === 'OK') {
  //         const geometry = result[0].geometry.location;
  //         const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
  //         debugger;
  //         this.cacheLocation(location, coordinates);
  //         debugger;
  //         this.mapObservable.next(this.cachedLocation[this.camelize(location)]);
  //       } else {
  //         this.mapObservable.error('Location could not be geocoded');
  //       }
  //     });
  //     return this.mapObservable.asObservable();
  //   }
  // }

  public geocodeLocation(location: string): Observable<any> {
    this.geoCoder = new (<any>window).google.maps.Geocoder();

    return new Observable(observer => {
      if (this.isLocationCached(location)) {
        observer.next(this.cachedLocation[this.camelize(location)]);
      } else {
        this.geoCoder.geocode({ address: location }, (result, status) => {
          if (status === 'OK') {
            const geometry = result[0].geometry.location;

            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

            this.cacheLocation(location, coordinates);
            observer.next(coordinates);
          } else {
            observer.error('Location could not be geocoded');
          }
        });
      }
    });
  }
}
