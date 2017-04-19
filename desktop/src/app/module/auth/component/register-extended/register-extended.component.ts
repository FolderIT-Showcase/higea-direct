import {Component, OnInit} from '@angular/core';
import {TipoDocumento, TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {Genero} from '../../../core/domain/enums/genero';
import {Pais} from '../../../core/domain/pais';

class Datos {
  pais: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: number;
  genero: Genero;
  fechaNacimiento: string;
}

@Component({
  selector: 'app-register-extended',
  templateUrl: './register-extended.component.html',
  styleUrls: ['./register-extended.component.scss']
})
export class RegisterExtendedComponent implements OnInit {

  model: Datos = new Datos;
  paises: Pais[] = [];
  tipoDocumentos: TipoDocumentos = new TipoDocumentos();
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: { date: Date, mode: string }[];
  public formats: string[] = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY',
    'shortDate'];
  public format: string = this.formats[0];
  public dateOptions: any = {
    formatYear: 'YY',
    startingDay: 1
  };
  private opened = false;

  public constructor() {
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];
  }

  ngOnInit() {
  }

}
