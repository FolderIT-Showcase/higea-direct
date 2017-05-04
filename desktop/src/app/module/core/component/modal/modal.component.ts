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
  @Output() outModal = new EventEmitter<ModalDirective>();


  ngOnInit() {
    this.outModal.emit(this.modal);
  }

}

