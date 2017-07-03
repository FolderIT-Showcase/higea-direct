import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {Datepicker} from './datepicker.component';
import {FocusDirective} from './directives/datepicker.focus.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [Datepicker, FocusDirective],
  exports: [Datepicker, FocusDirective]
})
export class MyDatePickerModule {
}
