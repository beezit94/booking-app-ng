import { Component, OnInit, Input } from '@angular/core';
import { EditableComponent } from '../editable-components';

@Component({
  selector: 'app-editable-select',
  templateUrl: './editable-select.component.html',
  styleUrls: ['./editable-select.component.scss']
})
export class EditableSelectComponent extends EditableComponent {
  @Input() public options: any[];
}
