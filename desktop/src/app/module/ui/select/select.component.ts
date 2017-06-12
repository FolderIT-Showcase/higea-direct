import {Component, EventEmitter, Input, Output} from '@angular/core';

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

  mModel: any = null;

  @Output() ngModel = new EventEmitter<any>();

  @Input()
  set setModel(item) {
    this.mModel = item;
  }

  handleChange(item) {
    console.log(item);
    this.ngModel.emit(item);
  }

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
