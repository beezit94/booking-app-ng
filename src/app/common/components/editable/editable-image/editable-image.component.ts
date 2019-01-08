import { Component, OnInit } from '@angular/core';
import { EditableComponent } from '../editable-components';

@Component({
  selector: 'app-editable-image',
  templateUrl: './editable-image.component.html',
  styleUrls: ['./editable-image.component.scss']
})
export class EditableImageComponent extends EditableComponent {
  handleImageUpload(imageUrl: string) {
    this.entity[this.entityField] = imageUrl;
    this.updateEntity();
  }

  handleImageError() {
    this.cancelUpdate();
  }

  handleImageLoad() {
    this.isActiveInput = true;
  }
}
