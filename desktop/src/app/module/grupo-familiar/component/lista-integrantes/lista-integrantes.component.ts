import {Component, OnInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {AlertService} from '../../../core/service/alert.service';
import {Persona} from '../../../core/domain/persona';
import {EstadosCiviles} from '../../../core/domain/enums/estado-civil';
import {Generos} from '../../../core/domain/enums/genero';
import {TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {TipoContactos} from '../../../core/domain/enums/tipo-contacto';
import * as _ from 'lodash';
import {StoreService} from '../../../core/service/store.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonaService} from '../../../core/service/persona.service';
import {Localidad} from '../../../core/domain/localidad';
import {Provincia} from '../../../core/domain/provincia';
import {Documento} from '../../../core/domain/documento';
import {Contacto} from '../../../core/domain/contacto';
import {Domicilio} from '../../../core/domain/domicilio';
import {Pais} from '../../../core/domain/pais';
import {Store} from '../../../core/service/store';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-lista-integrantes',
  templateUrl: './lista-integrantes.component.html',
  styleUrls: ['./lista-integrantes.component.scss']
})
export class ListaIntegrantesComponent implements OnInit {

  private currentUser = JSON.parse(localStorage.getItem('currentUser'));
  public busy: Promise<any>;
  public currentPersona = new Persona();
  public modalAction = 'none';
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

  localidades: Localidad[] = [];
  provincias: Provincia[] = [];
  integrante: Persona = null;

  mForm: FormGroup;

  modalConfirmacion: ModalDirective;
  modalForm: ModalDirective;
  subs: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private store: Store,
              private personaService: PersonaService,
              private alertService: AlertService,
              private storeHelper: StoreService) {

    this.mForm = fb.group({
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
      'genero': [null, Validators.required],
      'tipoDocumento': [null, Validators.required],
      'numeroDocumento': [null, Validators.required],
      'fechaNacimiento': [null, Validators.required],
      'tipoContacto': [null],
      'dato': [null],
      'estadoCivil': [null],
      'pais': [null, Validators.required],
      'provincia': [null, Validators.required],
      'localidad': [null, Validators.required],
      'calle': [null],
      'piso': [null],
      'departamento': [null]
    });

  }

  ngOnInit(): void {

    // Popular listas
    this.provincias = this.storeHelper.get('provincias');
    this.lists.paises = this.storeHelper.get('paises');
    this.localidades = this.storeHelper.get('localidades');

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
    this.lists.provincias = [];
    this.lists.localidades = [];

    if (!form.pais || !form.pais.id) {
      return;
    }

    // Busqueda de provincias
    if (form.pais.nombre.toUpperCase() === 'ARGENTINA') {
      this.lists.provincias = this.provincias
    } else {
      this.lists.provincias.push(new Provincia(' --- OTRA --- '));
    }

    // Busqueda de localidades
    if (form.provincia) {
      this.lists.localidades = this.localidades.filter(x => x.provincia.id === form.provincia.id);
    }
  }

  public showModal(action, integrante: Persona) {
    this.modalForm.show();
    this.modalAction = action;
    this.integrante = integrante;

    this.rebuildLists(integrante);

    if (['edit', 'view'].indexOf(action) >= 0) {

      const tipoContacto = integrante.contacto[0] ? integrante.contacto[0].tipoContacto : '';
      const dato = integrante.contacto[0] ? integrante.contacto[0].dato : '';
      const localidad = integrante.domicilio.localidad ? integrante.domicilio.localidad.nombre : '';
      const provincia = () => {
        if (integrante.domicilio.localidad && integrante.domicilio.localidad.provincia) {
          return integrante.domicilio.localidad.provincia.nombre;
        }
        return '';
      };
      const pais = () => {
        if (integrante.domicilio.localidad && integrante.domicilio.localidad.provincia &&
          integrante.domicilio.localidad.provincia.pais) {
          return integrante.domicilio.localidad.provincia.pais.nombre;
        }
        return '';
      };
      const calle = (integrante.domicilio && integrante.domicilio.calle) ? integrante.domicilio.calle : '';
      const piso = (integrante.domicilio && integrante.domicilio.piso) ? integrante.domicilio.piso : '';
      const departamento = (integrante.domicilio && integrante.domicilio.departamento) ? integrante.domicilio.departamento : '';

      this.mForm.setValue({
        'nombre': integrante.nombre || '',
        'apellido': integrante.apellido || '',
        'genero': integrante.genero || '',
        'tipoDocumento': integrante.documento.tipo || '',
        'numeroDocumento': integrante.documento.numero || '',
        'fechaNacimiento': integrante.fechaNacimiento || Date().toLocaleString(),
        'tipoContacto': tipoContacto,
        'dato': dato,
        'estadoCivil': integrante.estadoCivil || '',
        'pais': pais,
        'provincia': provincia,
        'localidad': localidad,
        'calle': calle,
        'piso': piso,
        'departamento': departamento
      });
      return;
    }

    this.mForm.reset();

  }

  showDeleteModal(persona) {
    this.integrante = persona;
    this.modalConfirmacion.show();
  }

  confirmDeleteModal() {
    const prevPersona = _.merge({}, this.currentPersona);
    const i = _.findIndex(this.currentPersona.integrantes, this.integrante);
    if (i >= 0) {
      this.currentPersona.integrantes.splice(i, 1);
    }

    this.busy = this.personaService.updatePersonaUser(this.currentPersona)
      .then(() => {
        this.alertService.success('Integrante removido correctamente.');
      })
      .catch((error) => {
        this.currentPersona = _.merge({}, prevPersona);
        console.error(error);
      });

    this.modalConfirmacion.hide();

  }

  buildIntegrante(form) {
    const integrante: Persona = new Persona();
    integrante.nombre = form.nombre;
    integrante.apellido = form.apellido;
    integrante.genero = form.genero;
    integrante.documento = new Documento();
    integrante.documento.tipo = form.tipoDocumento;
    integrante.documento.numero = form.numeroDocumento;
    integrante.fechaNacimiento = form.fechaNacimiento;
    integrante.contacto = [];
    integrante.contacto.push(new Contacto(form.tipoContacto, form.dato));
    integrante.estadoCivil = form.estadoCivil;
    integrante.domicilio = new Domicilio();
    integrante.domicilio.localidad = new Localidad(form.localidad);
    integrante.domicilio.localidad.provincia = new Provincia(form.provincia);
    integrante.domicilio.localidad.provincia.pais = new Pais(form.pais);
    integrante.domicilio.calle = form.calle;
    integrante.domicilio.piso = form.piso;
    integrante.domicilio.departamento = form.departamento;

    return integrante;
  }

  public confirmModal(action, form) {

    const integranteNuevo = this.buildIntegrante(form);
    const prevPersona = _.merge({}, this.currentPersona);

    switch (action) {

      case 'add':
        if (!this.currentPersona.integrantes) {
          this.currentPersona.integrantes = [];
        }
        this.currentPersona.integrantes.push(integranteNuevo);

        console.log(integranteNuevo);
        console.log(this.currentPersona);


        this.busy = this.personaService.updatePersonaUser(this.currentPersona)
          .then(() => {
            this.alertService.success('Integrante agregado correctamente.');
          });
        break;

      case 'edit':
        _.merge(this.integrante, integranteNuevo);

        this.busy = this.personaService.updatePersonaUser(this.currentPersona)
          .then(() => {
            this.alertService.success('Integrante editado correctamente.');
          })
          .catch(() => {
            this.currentPersona = _.merge({}, prevPersona);
          });
        break;

      default:
        return;
    }

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
  }

}
