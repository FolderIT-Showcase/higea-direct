import {Component, OnInit} from '@angular/core';
import {Profesional} from '../../core/domain/profesional';
import {StoreService} from '../../core/service/store.service';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.scss']
})
export class ProfesionalesComponent implements OnInit {

  profesionales: Profesional[] = [];

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.profesionales = this.storeService.get('profesionales');
  }

}
