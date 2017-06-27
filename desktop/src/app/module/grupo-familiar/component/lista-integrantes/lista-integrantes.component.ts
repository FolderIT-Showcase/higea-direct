import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {AlertService} from '../../../../service/alert.service';
import {Persona} from '../../../../domain/persona';
import {EstadosCiviles} from '../../../../domain/enums/estado-civil';
import {Generos} from '../../../../domain/enums/genero';
import {TipoDocumentos} from '../../../../domain/enums/tipo-documento';
import {TipoContactos} from '../../../../domain/enums/tipo-contacto';
import {StoreService} from '../../../../service/store.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonaService} from '../../../../service/persona.service';

import {Documento} from '../../../../domain/documento';
import {Contacto} from '../../../../domain/contacto';
import {Store} from '../../../../service/store';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';
import {DatePipe} from '@angular/common';
import {Util} from '../../../../service/utils.service';
import {ObraSocial} from '../../../../domain/obra-social';
import {Plan} from '../../../../domain/plan';
import {IMyOptions} from '../../../my-date-picker/interfaces/my-options.interface';
import {MetadataService} from '../../../../service/metadata.service';

@Component({
  selector: 'app-lista-integrantes',
  templateUrl: './lista-integrantes.component.html'
})
export class ListaIntegrantesComponent implements OnInit, AfterViewInit {

  private currentUser = JSON.parse(localStorage.getItem('currentUser'));
  public currentPersona: Persona;
  public modalAction = 'none';
  public integrantes: Persona[] = [];
  public lists = {
    'generos': Generos.export(),
    'tipoDocumentos': TipoDocumentos.export(),
    'estadosCiviles': EstadosCiviles.export(),
    'tipoContactos': TipoContactos.export()
  };

  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  datePipe = new DatePipe('es-AR');

  integrante: Persona = null;
  obras_sociales: ObraSocial[] = [];
  obraSocial: ObraSocial;
  planes: Plan[] = [];
  plan: Plan;

  mForm: FormGroup;
  modalConfirmacion: ModalDirective;
  modalForm: ModalDirective;
  subs: Subscription[] = [];
  desktopMode = true;

  validatorPlan: any [] = [];
  tieneObraSocial = false;

  constructor(private fb: FormBuilder,
              private utilsService: Util,
              private store: Store,
              private metadataService: MetadataService,
              private personaService: PersonaService,
              private alertService: AlertService,
              private storeHelper: StoreService) {

    this.mForm = fb.group({
      'nombre': [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'apellido': [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'genero': [null, Validators.required],
      'numeroDocumento': [null, Validators.required],
      'tipoDocumento': [null],
      'telefono': [null],
    });

  }

  ngOnInit() {

    this.metadataService.getObrasSociales()
      .then(data => {
        this.obras_sociales = data;
        console.log(this.obras_sociales)
      });

    this.subs.push(
      this.store.changes.pluck('integrantes').subscribe(
        (data: any) => {
          this.integrantes = data;
        }
      )
    );

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

  ngAfterViewInit(): void {
    this.desktopMode = (Util.getWidth()) >= 1000;
    this.subs.push(this.utilsService.getWidthResizeEvent().subscribe(data => {
      this.desktopMode = data >= 1000;
    }));
  }

  public label(list, id) {
    if (!id) return '';
    const e = this.lists[list].find(x => x.id === id);
    if (e) return e.label;
    else return '';
  }

  public showModal(action, integrante: Persona) {

    this.mForm.reset();
    this.modalForm.show();
    this.modalAction = action;
    this.integrante = integrante;

    if (['edit', 'view'].indexOf(action) >= 0) {

      const tipoContacto = (integrante.contacto && integrante.contacto[0] && integrante.contacto[0].tipoContacto)
        ? integrante.contacto[0].tipoContacto : '';
      const dato = (integrante.contacto && integrante.contacto[0] && integrante.contacto[0].dato)
        ? integrante.contacto[0].dato : '';
      const calle = (integrante.domicilio && integrante.domicilio.calle) ? integrante.domicilio.calle : '';
      const piso = (integrante.domicilio && integrante.domicilio.piso) ? integrante.domicilio.piso : '';
      const departamento = (integrante.domicilio && integrante.domicilio.departamento) ? integrante.domicilio.departamento : '';

      this.mForm = this.fb.group({
        'nombre': integrante.nombre || '',
        'apellido': integrante.apellido || '',
        'genero': integrante.genero || '',
        'tipoDocumento': integrante.documento.tipoDocumento || '',
        'numeroDocumento': integrante.documento.numero || '',
   /*     'fechaNacimiento': {
          date: {
            year: this.datePipe.transform(integrante.fechaNacimiento, 'yyyy'),
            month: this.datePipe.transform(integrante.fechaNacimiento, 'M'),
            day: this.datePipe.transform(integrante.fechaNacimiento, 'dd')
          }
        },*/
        'tipoContacto': tipoContacto,

      });

    }

  }

  showDeleteModal(persona) {
    this.integrante = persona;
    this.modalConfirmacion.show();
  }

  confirmDeleteModal() {

    const integrantes: Persona[] = [];

    this.currentPersona.integrantes.forEach(x => {
      if (x.id !== this.integrante.id) {
        integrantes.push(x)
      }
    });

    this.currentPersona.integrantes = _.merge([], integrantes);

    this.personaService.delete(this.currentPersona)
      .then(() => {
        this.alertService.success('Integrante removido correctamente.');
      });

    this.modalConfirmacion.hide();

  }

  buildIntegrante(form) {

    console.log(form);

    const integrante: Persona = new Persona();

    for (const i in form) {
      if (!form[i]) {
        form[i] = null;
      }
    }

    integrante.id = this.integrante.id;
    integrante.nombre = form.nombre;
    integrante.apellido = form.apellido;
    integrante.documento = new Documento();
    integrante.documento.id = null;
    integrante.documento.numero = form.numeroDocumento;

    if (form.tipoDocumento && form.tipoDocumento.id) {
      integrante.documento.tipoDocumento = form.tipoDocumento.id;
    } else {
      integrante.documento.tipoDocumento = TipoDocumentos.findByLabel('DNI');
    }
    if (form.telefono) {
      integrante.contacto = [];
      integrante.contacto.push(new Contacto('telefono', form.telefono));
    }
    if (form.genero && form.genero.id) {
      integrante.genero = form.genero.id;
    }
    if (this.tieneObraSocial) {
      integrante.plan = form.plan;
      integrante.nroAfiliado = form.nroAfiliado;
    } else {
      const os = this.obras_sociales.find(x => {
        if (x.nombre) return x.nombre.trim().toLowerCase() === 'particular';
        else return false;
      });
      console.log(os);
      integrante.plan = os.planes[0]
    }

    console.log(this.tieneObraSocial ? 'tiene obra social' : 'no tiene');
    console.log(integrante.plan);

    return integrante;
  }

  public confirmModal(action, form) {

    let integranteNuevo: Persona = this.buildIntegrante(form);

    if (!this.currentPersona.integrantes) {
      this.currentPersona.integrantes = [];
    }

    // si es la persona usuario
    if (integranteNuevo.id === this.integrantes[0].id) {
      // copiamos los integrantes que ya tenia
      integranteNuevo = _.defaultsDeep(integranteNuevo, this.currentPersona);
      integranteNuevo.integrantes = _.merge({}, this.currentPersona.integrantes);
      // y copiamos a current persona
      this.currentPersona = _.merge({}, integranteNuevo);
    } else {

      if (action === 'edit') {
        const index = this.currentPersona.integrantes.findIndex((value, index, obj) => value.id === integranteNuevo.id);
        this.currentPersona.integrantes[index] = integranteNuevo;
      }
      this.currentPersona.integrantes.push(integranteNuevo);
    }

    this.personaService.updatePersonaUser(this.currentPersona)
      .then(() => {
        if (action === 'add') {
          this.alertService.success('Integrante agregado correctamente.');
        } else if (action === 'edit') {
          this.alertService.success('Integrante editado correctamente.');
        }
      });

    this.modalForm.hide();
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
    this.mForm.reset();
  }

  timeStampToDate(timestamp) {
    if (!timestamp) {
      return this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
    }
    let date: any = new Date(timestamp);
    date = this.datePipe.transform(date, 'dd/MM/yyyy');
    return date;
  }

  handleObraSocialClick(obra_social: ObraSocial) {
    if (obra_social) {
      this.planes = obra_social.planes;
      this.validatorPlan.push(Validators.required);
    }
  }

  eventClickOS(event) {
    console.log(this.tieneObraSocial);
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.tieneObraSocial = !this.tieneObraSocial;
    if (this.tieneObraSocial) {
      this.mForm = this.fb.group({
        'nombre': [this.mForm.value.nombre, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'apellido': [this.mForm.value.apellido, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'telefono': [this.mForm.value.telefono, Validators.required],
        'tipoDocumento': [this.mForm.value.tipoDocumento],
        'numeroDocumento': [this.mForm.value.numeroDocumento, Validators.required],
        'genero': [this.mForm.value.genero, Validators.required],
        'obraSocial': [this.mForm.value.obraSocial, Validators.required],
        'plan': [this.mForm.value.plan, Validators.required],
        'nroAfiliado': [this.mForm.value.nroAfiliado],
      });
    } else {

      this.mForm = this.fb.group({
        'nombre': [this.mForm.value.nombre, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'apellido': [this.mForm.value.apellido, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
         'telefono': [this.mForm.value.telefono, Validators.required],
        'tipoDocumento': [this.mForm.value.tipoDocumento],
        'numeroDocumento': [this.mForm.value.numeroDocumento, Validators.required],
        'genero': [this.mForm.value.genero, Validators.required],
        'obraSocial': [this.mForm.value.obraSocial],
        'plan': [this.mForm.value.plan],
        'nroAfiliado': [this.mForm.value.nroAfiliado],
      });
    }

  }

}
