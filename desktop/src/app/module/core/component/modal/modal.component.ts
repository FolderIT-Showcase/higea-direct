import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('staticModal') public modal: ModalDirective;

  @Input() backdrop = 'static';
  @Input() small = false;
  @Input() title = 'Modal estático.';
  @Input() message = '';
  @Input() type = 'question'; // info, question
  @Input() acceptCallback: Function = null;
  @Input() template = '';

  @Output() outModal = new EventEmitter<ModalDirective>();


  constructor() {
  }

  ngOnInit() {

    this.outModal.emit(this.modal);

    switch (this.type) {
      case 'question':
        if (!this.acceptCallback) {
          this.acceptCallback = this.modal.hide;
        }

        break;
      case 'info':
        break;
    }

  }

}

