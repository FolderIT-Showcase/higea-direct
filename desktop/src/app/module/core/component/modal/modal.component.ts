import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @Input() template = '';
  @Input() actionButtonLabel = 'ACEPTAR';

  @Input() dataHtml = '';
  @ViewChild('dataContainer') dataContainer: ElementRef;

  @Output() outModal = new EventEmitter<ModalDirective>();
  @Output() acceptEvent = new EventEmitter();

  ngOnInit() {

    this.outModal.emit(this.modal);
    this.loadData(this.template);

    switch (this.type) {
      case 'question':
        break;
      case 'info':
        break;
    }

  }

  loadData(data) {
    this.dataContainer.nativeElement.innerHTML = data;
  }

  emitAcceptEvent() {
    this.acceptEvent.emit(1);
    this.modal.hide();
  }

}

