import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {AlertService} from '../../../../service/alert.service';
import {Persona} from '../../../../domain/persona';
import {EstadosCiviles} from '../../../../domain/enums/estado-civil';
import {Generos} from '../../../../domain/enums/genero';
import {TipoDocumentos} from '../../../../domain/enums/tipo-documento';
import {TipoContactos} from '../../../../domain/enums/tipo-contacto';
import {StoreService} from '../../../../service/store.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonaService} from '../../../../service/persona.service';
import {Localidad} from '../../../../domain/localidad';
import {Provincia} from '../../../../domain/provincia';
import {Documento} from '../../../../domain/documento';
import {Contacto} from '../../../../domain/contacto';
import {Domicilio} from '../../../../domain/domicilio';
import {Pais} from '../../../../domain/pais';
import {Store} from '../../../../service/store';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';
import {DatePipe} from '@angular/common';
import {UtilsService} from '../../../../service/utils.service';
import {ObraSocial} from '../../../../domain/obra-social';
import {Plan} from '../../../../domain/plan';
import {Metadata} from '../../../../domain/metadata';
import {IMyOptions} from '../../../my-date-picker/interfaces/my-options.interface';

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
    'tipoContactos': TipoContactos.export(),
    'paises': [],
    'provincias': [],
    'localidades': []
  };

  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  datePipe = new DatePipe('es-AR');

  localidades: Localidad[] = [];
  provincias: Provincia[] = [];
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

  constructor(private fb: FormBuilder,
              private utilsService: UtilsService,
              private store: Store,
              private personaService: PersonaService,
              private alertService: AlertService,
              private storeHelper: StoreService) {

    this.getMetadata();

    const defaultTipoDocumento = this.lists.tipoDocumentos.find(x => x.id.toLowerCase() === 'dni');
    const defaultPais = this.lists.paises.find(x => x.nombre.toLowerCase() === 'argentina');
    const defaultProvincia = this.lists.provincias.find(x => x.nombre.toLowerCase() === 'santa fe');

    console.log(defaultTipoDocumento);

    this.mForm = this.fb.group({
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
      'genero': [null, Validators.required],
      'tipoDocumento': [defaultTipoDocumento, Validators.required],
      'numeroDocumento': [null, Validators.required],
      'fechaNacimiento': [null, Validators.required],
      'pais': [defaultPais, Validators.required],
      'provincia': [defaultProvincia, Validators.required],
      'localidad': [null, Validators.required],
      'calle': [null],
      'telefono': [null],
      'celular': [null],
      'email': [null],
      'obraSocial': [null, Validators.required],
      'plan': [null, Validators.required],
      'nroAfiliado': [null],
    });

  }

  planMatcher = (control: AbstractControl): { [key: string]: boolean } => {
    const plan = control.get('plan');
    const os = control.get('obraSocial');
    if (!os) return null;
    return (os && plan) ? null : {nomatch: true};
  };

  private getMetadata() {
    const metadata: Metadata = this.storeHelper.get('metadata');
    this.lists.paises = metadata.paises;
    this.provincias = metadata.provincias;
    this.localidades = metadata.localidades;
    this.obras_sociales = metadata.obrasSociales;
  }

  ngOnInit() {

    console.log(this.mForm.value)

    this.subs.push(
      this.store.changes.pluck('integrantes').subscribe(
        (data: any) => {
          this.integrantes = data;
        }
      )
    );

    this.integrantes = this.storeHelper.get('integrantes');
    this.currentPersona = this.storeHelper.get('persona');
    console.log(this.currentPersona);

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
    this.desktopMode = (this.utilsService.getWidth()) >= 1000;
    this.subs.push(this.utilsService.getWidthResizeEvent().subscribe(data => {
      this.desktopMode = data >= 1000;
    }));
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

  rebuildProvinceList(pais) {
    const paisID = pais.id;
    if (!paisID) {
      return;
    }
    const argentina: Pais = this.lists.paises.find(x => x.nombre.toUpperCase() === 'ARGENTINA');
    if (Number(paisID) === Number(argentina.id)) {
      this.lists.provincias = this.provincias
    } else {
      // TODO: completar otras provincias
    }
  }

  rebuildLocationList(provincia) {
    const provinciaID = provincia.id;
    if (!provinciaID) {
      return;
    }
    this.lists.localidades = this.localidades.filter(x => Number(x.provincia.id) === Number(provinciaID));
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
      const localidad = (integrante.domicilio && integrante.domicilio.localidad) ? integrante.domicilio.localidad.id : '';
      const provincia = () => {
        if (integrante.domicilio.localidad && integrante.domicilio.localidad.provincia) {
          return integrante.domicilio.localidad.provincia.id;
        }
        return '';
      };
      const pais = () => {
        if (integrante.domicilio.localidad && integrante.domicilio.localidad.provincia &&
          integrante.domicilio.localidad.provincia.pais) {
          return integrante.domicilio.localidad.provincia.pais.id;
        }
        return new Pais();
      };
      const calle = (integrante.domicilio && integrante.domicilio.calle) ? integrante.domicilio.calle : '';
      const piso = (integrante.domicilio && integrante.domicilio.piso) ? integrante.domicilio.piso : '';
      const departamento = (integrante.domicilio && integrante.domicilio.departamento) ? integrante.domicilio.departamento : '';

      this.mForm.setValue({
        'nombre': integrante.nombre || '',
        'apellido': integrante.apellido || '',
        'genero': integrante.genero || '',
        'tipoDocumento': integrante.documento.tipoDocumento || '',
        'numeroDocumento': integrante.documento.numero || '',
        'fechaNacimiento': {
          date: {
            year: this.datePipe.transform(integrante.fechaNacimiento, 'yyyy'),
            month: this.datePipe.transform(integrante.fechaNacimiento, 'M'),
            day: this.datePipe.transform(integrante.fechaNacimiento, 'dd')
          }
        },
        'tipoContacto': tipoContacto,
        'dato': dato,
        'estadoCivil': EstadosCiviles.findIDByLabel(integrante.estadoCivil) || '',
        'pais': pais(),
        'provincia': provincia(),
        'localidad': localidad,
        'calle': calle,
        'piso': piso,
        'departamento': departamento
      });

      if (integrante && integrante.domicilio && integrante.domicilio.localidad &&
        integrante.domicilio.localidad.provincia && integrante.domicilio.localidad.provincia.pais) {
        this.rebuildProvinceList(integrante.domicilio.localidad.provincia.pais.id);
        this.rebuildLocationList(integrante.domicilio.localidad.provincia.id);
      }

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
      })
      .catch((error) => {
        console.error(error);
      });

    this.modalConfirmacion.hide();

  }

  buildIntegrante(form) {

    const integrante: Persona = new Persona();

    for (const i in form) {
      if (!form[i]) {
        form[i] = null;
      }
    }

    integrante.id = this.integrante.id;
    integrante.nombre = form.nombre;
    integrante.apellido = form.apellido;
    integrante.genero = form.genero;
    integrante.documento = new Documento();
    integrante.documento.id = null;
    integrante.documento.tipoDocumento = form.tipoDocumento;
    integrante.documento.numero = form.numeroDocumento;

    integrante.fechaNacimiento = form.fechaNacimiento.epoc;
    integrante.contacto = [];

    integrante.contacto.push(new Contacto('telefono', form.telefono));
    if (form.celular) {
      integrante.contacto.push(new Contacto('celular', form.celular));
    }
    if (form.email) {
      integrante.contacto.push(new Contacto('mail', form.email));
    }

    integrante.estadoCivil = form.estadoCivil ? form.estadoCivil.id : EstadosCiviles.findIDByLabel('Soltero');

    integrante.domicilio = new Domicilio();
    integrante.domicilio.piso = form.piso;
    integrante.domicilio.calle = form.calle;
    integrante.domicilio.departamento = form.departamento;

    integrante.domicilio.localidad = new Localidad();
    integrante.domicilio.localidad.id = form.localidad;
    integrante.domicilio.localidad.provincia = new Provincia();
    integrante.domicilio.localidad.provincia.id = form.provincia;
    integrante.domicilio.localidad.provincia.pais = new Pais();
    integrante.domicilio.localidad.provincia.pais.id = form.pais;
    integrante.plan = form.plan;
    integrante.nroAfiliado = form.nroAfiliado;

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
      this.mForm.controls['plan'].valid;
    }
  }

}
