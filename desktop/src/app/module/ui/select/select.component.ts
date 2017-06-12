import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() formControl;
  @Input() placeHolder;
  @Input() list;
  @Input() displayProp = null;
  @Output() change = new EventEmitter<any>();

  label(item) {
    if (this.displayProp) {
      return item[this.displayProp]
    }
    if (item) {
      return item;
    }
    return '';
  }

}
