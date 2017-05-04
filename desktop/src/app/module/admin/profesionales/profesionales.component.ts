import {Component, OnInit,ViewChild} from '@angular/core';
import {Profesional} from '../../core/domain/profesional';
import {StoreService} from '../../core/service/store.service';
import {AlertService} from "../../core/service/alert.service";
import {AdminService} from "../../core/service/admin.service";
import {Store} from "../../core/service/store";
import {PagerService} from "../../core/service/pager.service";
import {Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {ModalDirective} from "ngx-bootstrap/index";


class Data {
  especialidadName: string;
   especialidadSurname: string;
}
@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.scss']
})
export class ProfesionalesComponent implements OnInit {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  model: Data = new Data();
  especialidadName: string;
  especialidadSurname: string;
  profesionales: Profesional[] = [];

  public isModalShown = false;
  public isInfoModalShown = false;

  public totalItems = 0;
  public currentPage = 1;
  public smallnumPages = 0;
  public maxSize = 10;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  subs: Subscription[] = [];

  constructor(private store: Store,
              private storeService: StoreService,
              private alertService: AlertService,
              private router: Router,
              private  pagerService: PagerService,
              private adminService:AdminService) {
  }

 crear(): void {

    const profesional = new Profesional();
    profesional.nombre = this.model.especialidadName.toUpperCase();
    profesional.apellido = this.model.especialidadSurname.toUpperCase();
    this.adminService.saveProfesional(profesional).then(data => {
        this.alertService.success('Se guardo exitosamente');
      })
      .catch((error) => {
        console.log(error);
        this.alertService.error('Error al querer guardar el Profesional');
      });

  }

  clearForm() {

  }



  public setPage(page: number): void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.profesionales.length, page);

    // get current page of items
    this.pagedItems = this.profesionales.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.currentPage = page;
    console.log('paginas' + this.pager.totalPages);
    this.totalItems = this.pager.totalPages * this.maxSize;
  }

  public pageChanged(event: any): void {
    this.setPage(event.page);
  }

  ngOnInit(): void {

    this.subs.push(
      this.store.changes.pluck('profesionales').subscribe(
        (data: any) => {
          this.profesionales = data;
        }
      ));

    // initialize to page 1
    this.setPage(1);

  }

  public hideModal() {
    this.autoShownModal.hide();
  }

  public deleteProfesional(profesional: Profesional) {
    const profesionales:Profesional[] = this.storeService.get('profesionales');
    for (const x of profesionales) {
      if (x.id === profesional.id) {
        this.storeService.findAndDelete('profesionales', x.id);
        break;
      }
    }
  }

}

