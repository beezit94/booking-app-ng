import { EditableInputComponent } from './editable-input/editable-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditableTextareaComponent } from './editable-textarea/editable-textarea.component';
import { EditableSelectComponent } from './editable-select/editable-select.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [
    EditableInputComponent,
    EditableTextareaComponent,
    EditableSelectComponent
  ],
  declarations: [
    EditableInputComponent,
    EditableTextareaComponent,
    EditableSelectComponent
  ]
})
export class EditableModule {}
