import { MapService } from './map.service';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CamelizePipe } from 'ngx-pipes';
import { CommonModule } from '@angular/common';
import { env } from 'process';

@NgModule({
  declarations: [MapComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM'
    }),
    CommonModule
  ],
  exports: [MapComponent],
  providers: [MapService, CamelizePipe],
  bootstrap: []
})
export class MapModule {}
