import { MapService } from './map.service';
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() location: string;
  isPositionError: boolean = false;

  lat: number;
  lng: number;
  constructor(private mapService: MapService, private ref: ChangeDetectorRef) {}

  ngOnInit() {}

  mapReadyHandler() {
    this.mapService.geocodeLocation(this.location).subscribe(
      coordinates => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
      },
      () => {
        this.isPositionError = true;
        this.ref.detectChanges();
      }
    );
  }
}
