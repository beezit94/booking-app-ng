import { Component, Input } from '@angular/core';
import { EditableComponent } from '../editable-components';

@Component({
  selector: 'app-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent extends EditableComponent {
  @Input() type: string = 'text';

  @Input() transformView = value => value;
}
