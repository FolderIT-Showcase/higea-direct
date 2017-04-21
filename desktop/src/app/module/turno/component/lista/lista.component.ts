import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-hospital-turno-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public isModalShown = false;

  title = 'My first angular2-google-maps project';
  lat = -31.623357;
  lng = -60.704956;

  public showModal() {
    this.isModalShown = true;
  }

  public hideModal() {
    this.autoShownModal.hide();
  }

  public onHidden() {
    this.isModalShown = false;
  }
}
