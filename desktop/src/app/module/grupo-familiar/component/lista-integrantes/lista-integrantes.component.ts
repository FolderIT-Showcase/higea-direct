import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-lista-integrantes',
  templateUrl: './lista-integrantes.component.html',
  styleUrls: ['./lista-integrantes.component.scss']
})
export class ListaIntegrantesComponent {
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public isModalShown = false;
  public modalAction = 'none';
  public integrantes = [{
    'principal': true,
    'nombre': 'Luis',
    'apellido': 'Bonsembiante',
    'fechaNacimiento': '13/09/1982',
    'documentoTipo': 'DNI',
    'documentoNumero': '29618961'
  }, {
    'principal': false,
    'nombre': 'Ignacio',
    'apellido': 'Bonsembiante',
    'fechaNacimiento': '21/02/2013',
    'documentoTipo': 'DNI',
    'documentoNumero': '521456369'
  }];

  public showModal(action, integrante) {
    this.isModalShown = true;
    this.modalAction = action;
    //         alert('showModal');
  }

  public hideModal(action) {
    this.autoShownModal.hide();
    //         alert('hideModal');
  }

  public onHidden(action) {
    this.isModalShown = false;
    //         alert('onHidden');
  }

  public confirmModal(action, integrante) {
    this.autoShownModal.hide();
    //         alert('confirmModal');
  }
}
