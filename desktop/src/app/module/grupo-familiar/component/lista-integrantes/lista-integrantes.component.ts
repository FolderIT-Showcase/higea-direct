import {Component, OnInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {AlertService} from '../../../core/service/alert.service';
import {Persona} from '../../../core/domain/persona';
import {EstadosCiviles} from '../../../core/domain/enums/estado-civil';
import {Generos} from '../../../core/domain/enums/genero';
import {TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {TipoContactos} from '../../../core/domain/enums/tipo-contacto';
import {ApiService} from '../../../core/service/api.service';
import _ from 'lodash';
import {StoreService} from '../../../core/service/store.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MetadataService} from '../../../core/service/metadata.service';

@Component({
  selector: 'app-lista-integrantes',
  templateUrl: './lista-integrantes.component.html',
  styleUrls: ['./lista-integrantes.component.scss']
})
export class ListaIntegrantesComponent implements OnInit {

  private integranteSelected: Persona = new Persona();
  private currentUser = JSON.parse(localStorage.getItem('currentUser'));
  public busy: Promise<any>;
  public isModalShown = false;
  public currentPersona = new Persona();
  public modalAction = 'none';
  public formData: any = {};
  public selectUndefined: any;
  public integrantes: Persona[] = [];
  public lists = {
    'generos': Generos.export(),
    'tipoDocumentos': TipoDocumentos.export(),
    'estadosCiviles': EstadosCiviles.export(),
    'tipoContactos': TipoContactos.export(),
    'paises': [],
    'provincias': [],
    'localidades': []
  };

  mForm: FormGroup;

  modalConfirmacion: ModalDirective;
  modalForm: ModalDirective;

  constructor(private fb: FormBuilder,
              private metadataService: MetadataService,
              private alertService: AlertService,
              private api: ApiService,
              private storeHelper: StoreService) {

    this.mForm = fb.group({
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
      'genero': [null, Validators.required],
      'tipoDocumento': [null, Validators.required],
      'numeroDocumento': [null, Validators.required],
      'fechaNacimiento': [null, Validators.required],
      'tipoContacto': [null, Validators.required],
      'numeroContacto': [null, Validators.required],
      'estadoCivil': [null, Validators.required],
      'pais': [null, Validators.required],
      'provincia': [null, Validators.required],
      'localidad': [null, Validators.required],
      'calle': [null, Validators.required],
      'piso': [null, Validators.required],
      'departamento': [null, Validators.required]
    });

  }

  ngOnInit(): void {

    // Popular listas
    this.lists.provincias = this.storeHelper.get('provincias');
    this.lists.paises = this.storeHelper.get('paises');

    this.integrantes = this.storeHelper.get('integrantes');
    this.currentPersona = this.storeHelper.get('persona');

    // Reordenar las listas para permitir una edición rápida
    for (const list in this.lists) {
      if (!this.lists.hasOwnProperty(list)) {
        continue;
      }
      if (Array.isArray(this.lists[list])) {
        this.lists[list].sort();
      }
    }
  }

  public label(list, id) {
    if (!id) {
      return '';
    }
    const e = this.lists[list].find(x => x.id === id);
    if (e) {
      return e.label;
    } else {
      return '';
    }
  };

  public rebuildLists(form) {

    if (form.pais) {
      this.lists.provincias = this.lists.provincias.filter(x => x.pais.id === this.formData.domicilio.localidad.provincia.pais.id);
    }

    this.lists.provincias = [];
    this.lists.localidades = [];

    if (!form || !form.domicilio) {
      return;
    }

    const domicilio = form.domicilio;

    // Busqueda de provincias

    if (form.pais) {
      this.lists.provincias = this.lists.provincias.filter(x => x.id === form.pais.id);
    }

    // Busqueda de localidades
    if (form.provincia) {
      this.metadataService.getLocalidades(form.provincia)
        .then(data => {
          this.lists.localidades = data;
        })
        .catch(error => {
          console.error(error);
          this.alertService.error('TODO')
        });
    }
  }

  public showModal(action, integrante: Persona) {
    this.modalForm.show();
    this.modalAction = action;
    this.integranteSelected = integrante;

    this.rebuildLists(integrante);

    if (['edit', 'view', 'delete'].indexOf(action) >= 0) {
      console.log(integrante);
      this.mForm.setValue({
        'nombre': integrante.nombre || '',
        'apellido': integrante.apellido || '',
        'genero': integrante.genero || '',
        'tipoDocumento': integrante.documento.tipo || '',
        'numeroDocumento': integrante.documento.numero || '',
        'fechaNacimiento': integrante.fechaNacimiento || Date().toLocaleString(),
        'tipoContacto': integrante.contacto[0].tipoContacto || '',
        'numeroContacto': integrante.contacto[0].dato || '',
        'estadoCivil': integrante.estadoCivil || '',
        'pais': integrante.domicilio.localidad.provincia.pais.nombre || '',
        'provincia': integrante.domicilio.localidad.provincia.nombre || '',
        'localidad': integrante.domicilio.localidad.nombre || '',
        'calle': integrante.domicilio.calle || '',
        'piso': integrante.domicilio.piso || '',
        'departamento': integrante.domicilio.departamento || ''
      });
      return;
    }

    this.mForm.reset();

  }

  public onHidden(action) {
    this.isModalShown = false;
  }

  public confirmModal(action, integrante) {

    if (action === 'delete') {
      const prevPersona = _.merge({}, this.currentPersona);
      const i = _.findIndex(this.currentPersona.integrantes, integrante);
      if (i >= 0) {
        this.currentPersona.integrantes.splice(i, 1);
      }
      const path = 'persona';
      this.busy = this.api.post(path, this.currentPersona).first().toPromise().then((res) => {
        this.alertService.success('Integrante removido correctamente.');
      }, (error) => {
        this.currentPersona = _.merge({}, prevPersona);
        this.alertService.error('Ocurrió un error al intentar remover al integrante..');
      });
    }

    if (action === 'add') {
      const prevPersona = _.merge({}, this.currentPersona);
      this.currentPersona.integrantes.push(integrante);
      const path = 'persona';
      this.busy = this.api.post(path, this.currentPersona).first().toPromise().then((res) => {
        this.alertService.success('Integrante agregado correctamente.');
      }, (error) => {
        this.currentPersona = _.merge({}, prevPersona);
        this.alertService.error('Ocurrió un error al intentar agregar al integrante..');
      });
    }

    if (action === 'edit') {
      const prevPersona = _.merge({}, this.currentPersona);
      _.merge(this.integranteSelected, this.formData);
      const path = 'persona';
      console.log(this.currentPersona);
      this.busy = this.api.post(path, this.currentPersona).first().toPromise().then((res) => {
        this.alertService.success('Integrante editado correctamente.');
      }, (error) => {
        this.currentPersona = _.merge({}, prevPersona);
        this.alertService.error('Ocurrió un error al intentar editar al integrante..');
      });
    }
  }

  handleModalConfirmacion(event) {
    this.modalConfirmacion = event;
  }

  hideModalConfirmacion() {
    this.modalConfirmacion.hide();
  }

  handleModalForm(event) {
    this.modalForm = event;
  }

  hideModalForm() {
    this.modalForm.hide();
  }

  onDateChange(event) {
    console.log(event)
  }

}
