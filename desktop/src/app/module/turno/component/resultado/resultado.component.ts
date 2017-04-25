import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Turno} from 'app/module/core/domain/turno';
import {centroSalud} from '../../../core/domain/centro-salud';
import {StoreService} from '../../../core/service/store.service';
import {Store} from '../../../core/service/store';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-busqueda',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit, OnDestroy {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;

  centro: centroSalud = new centroSalud();
  turnos: Turno[] = [];
  subs: Subscription[] = [];

  public isModalShown = false;

  title = 'My first angular2-google-maps project';
  lat = -31.623357;
  lng = -60.704956;

  constructor(private storeService: StoreService, private store: Store) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.store.changes.pluck('centroSalud').subscribe(
        (data: any) => {
          this.centro = data;
        }));
    this.subs.push(
      this.store.changes.pluck('turnos').subscribe(
        (data: any) => {
          this.turnos = data;
        }
      ));
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }


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
