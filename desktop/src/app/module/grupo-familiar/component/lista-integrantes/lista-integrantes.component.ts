import {AfterViewInit, Component} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {AlertService} from '../../../../service/alert.service';
import {Persona} from '../../../../domain/persona';
import {Generos} from '../../../../domain/enums/genero';
import {TipoDocumentos} from '../../../../domain/enums/tipo-documento';
import {StoreService} from '../../../../service/store.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonaService} from '../../../../service/persona.service';
import {Documento} from '../../../../domain/documento';
import {Contacto} from '../../../../domain/contacto';
import {Store} from '../../../../service/store';
import {Subscription} from 'rxjs/Subscription';
import {Util} from '../../../../service/utils.service';
import {ObraSocial} from '../../../../domain/obra-social';
import {Plan} from '../../../../domain/plan';
import {IMyOptions} from '../../../my-date-picker/interfaces/my-options.interface';
import {MetadataService} from '../../../../service/metadata.service';

@Component({
  selector: 'app-lista-integrantes',
  templateUrl: './lista-integrantes.component.html'
})
export class ListaIntegrantesComponent implements AfterViewInit {

  private currentUser = JSON.parse(localStorage.getItem('currentUser'));
  public currentPersona: Persona = new Persona();
  public integrantes: Persona[] = [];
  public generos: Array<any> = Generos.export();
  public tipoDocumentos: Array<any> = TipoDocumentos.export();

  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  integrante: Persona = null;
  obras_sociales: ObraSocial[] = [];
  obraSocial: ObraSocial;
  planes: Plan[] = [];
  plan: Plan;

  mForm: FormGroup;
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

    this.integrantes = this.storeHelper.get('integrantes');
    this.currentPersona = this.storeHelper.get('persona');

    this.metadataService.getObrasSociales()
      .then(data => {
        this.obras_sociales = data;
      });

    this.subs.push(
      this.store.changes.pluck('integrantes').subscribe(
        (data: any) => {
          this.integrantes = data;
        }
      )
    );

  }

  ngAfterViewInit(): void {
    this.desktopMode = (Util.getWidth()) >= 1000;
    this.subs.push(this.utilsService.getWidthResizeEvent().subscribe(data => {
      this.desktopMode = data >= 1000;
    }));
  }

  public label(list, id) {
    if (!id) return '';
    const e = list.find(x => x.id === id);
    if (e) return e.label;
    else return '';
  }

  public showModal() {
    this.mForm.reset();
    this.modalForm.show();
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
    integrante.documento = new Documento();
    integrante.documento.id = null;
    integrante.documento.numero = form.numeroDocumento;
console.log(form.numeroDocumento);
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
      integrante.plan = os.planes[0]
    }

    return integrante;
  }

  public addModal(form) {
    const integranteNuevo: Persona = this.buildIntegrante(form);
    if (!this.currentPersona.integrantes) this.currentPersona.integrantes = [];
    this.currentPersona.integrantes.push(integranteNuevo);
    this.personaService.updatePersonaUser(this.currentPersona)
      .then(() => this.alertService.success('Integrante agregado correctamente.'));
    this.modalForm.hide();
  }

  handleModalForm(event) {
    this.modalForm = event;
  }

  hideModalForm() {
    this.modalForm.hide();
    this.mForm.reset();
  }

  handleObraSocialClick(obra_social: ObraSocial) {
    if (obra_social) {
      this.planes = obra_social.planes;
      this.validatorPlan.push(Validators.required);
    }
  }

  eventClickOS(event) {

    this.tieneObraSocial = !this.tieneObraSocial;
    if (this.tieneObraSocial) {
      this.mForm = this.fb.group({
        'nombre': [this.mForm.value.nombre, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'apellido': [this.mForm.value.apellido, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'genero': [this.mForm.value.genero, Validators.required],
        'numeroDocumento': [this.mForm.value.numeroDocumento, Validators.required],
        'tipoDocumento': [this.mForm.value.tipoDocumento],
        'telefono': [this.mForm.value.telefono],
        'obraSocial': [this.mForm.value.obraSocial, Validators.required],
        'plan': [this.mForm.value.plan, Validators.required],
        'nroAfiliado': [this.mForm.value.nroAfiliado]
      });
    } else {

      this.mForm = this.fb.group({
        'nombre': [this.mForm.value.nombre, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'apellido': [this.mForm.value.apellido, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'genero': [this.mForm.value.genero, Validators.required],
        'numeroDocumento': [this.mForm.value.numeroDocumento, Validators.required],
        'tipoDocumento': [this.mForm.value.tipoDocumento],
        'telefono': [this.mForm.value.telefono]
      });
    }

  }

}
