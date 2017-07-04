import {Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Store} from '../../../service/store';
import {Subscription} from 'rxjs/Subscription';
import {TurnoService} from '../../../service/turno.service';
import {StoreService} from '../../../service/store.service';
import {Persona} from '../../../domain/persona';
import {Especialidad} from '../../../domain/especialidad';
import {Profesional} from '../../../domain/profesional';
import {Turno} from '../../../domain/turno';
import {MotivoTurno} from '../../../domain/motivo-turno';
import {MetadataService} from '../../../service/metadata.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ObraSocial} from '../../../domain/obra-social';
import {Plan} from '../../../domain/plan';
import {PersonaService} from '../../../service/persona.service';
import {Documento} from '../../../domain/documento';
import {Contacto} from '../../../domain/contacto';
import {TipoDocumentos} from '../../../domain/enums/tipo-documento';

@Component({
  selector: 'app-turno-resultado-external',
  templateUrl: './turno-resultado-external.component.html'
})
export class TurnoResultadoExternalComponent implements OnInit, OnDestroy {

  turnos: Turno[] = [];
  turno: Turno = new Turno();
  subs: Subscription[] = [];
  persona: Persona;
  motivos: MotivoTurno[] = [];
  motivoTurno: MotivoTurno = new MotivoTurno();
  obras_sociales: ObraSocial[] = [];
  planes: Plan[] = [];

  turnoModal: ModalDirective;
  successModal: ModalDirective;
  timeline: Turno[] = [];
  clickCounter = 0;
  especialidades: Especialidad [];
  form: FormGroup;
  isFieldsetEnabled = false;

  constructor(private store: Store,
              private metadataService: MetadataService,
              private fb: FormBuilder,
              private turnoService: TurnoService,
              private personaService: PersonaService,
              private storeService: StoreService) {

    this.turno.especialidad = new Especialidad;
    this.turno.especialidad.nombre = '';
    this.turno.profesional = new Profesional();
    this.turno.profesional.nombre = '';

    this.form = this.fb.group({
      'numeroDocumento': [null, Validators.required],
      'telefono': [null, Validators.required],
      'apellido': [null, Validators.required],
      'nombre': [null, Validators.required],
      'obraSocial': [null, Validators.required],
      'plan': [null, Validators.required],
      'motivo': [null, Validators.required],
      'email': [null],
    });

  }

  ngOnInit(): void {

    this.metadataService.getObrasSociales().then((data: any) => this.obras_sociales = data);
    this.metadataService.getEspecialidades().then((data: any) => this.especialidades = data);
    this.metadataService.getMotivosTurno().then((data: any) => this.motivos = data);
    this.subs.push(
      this.store.changes.pluck('turnos').subscribe(
        (data: any) => {
          this.clickCounter++;

          if (!data || !data[0]) this.turnos = [];
          else this.turnos = data;

          this.buildTimeline(this.turnos);
        }
      ));
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
    this.storeService.update('turnos', []);
  }

  handleObraSocialClick(obraSocial: ObraSocial) {
    this.planes = obraSocial.planes;
  }

  buildTimeline(turnos: Turno[]) {

    // duracion en minutos
    let duracion = 30;
    this.timeline = [];
    if (turnos && turnos[0] && turnos[0].duracion) {
      duracion = turnos[0].duracion;
    }

    const baseMin = 0;
    const minHour = 8;
    const maxHour = 20;

    for (let i = minHour; i < maxHour; i++) {

      let date = new Date().setHours(i, baseMin, 0, 0);
      let turno = new Turno();
      turno.hora = date;

      for (let turnoEnabled of this.turnos) {
        const dateTimeline = new Date(turno.hora);
        const date = new Date(turnoEnabled.hora);
        if (dateTimeline.getHours() === date.getHours() &&
          dateTimeline.getMinutes() === date.getMinutes()) {
          turnoEnabled.enabled = true;
          turno = turnoEnabled;
        }
      }

      this.timeline.push(turno);

      for (let j = duracion; j !== 0; j = (j + duracion) % 60) {

        let date = new Date().setHours(i, j, 0, 0);
        let turno = new Turno();
        turno = new Turno();
        turno.hora = date;

        for (let turnoEnabled of this.turnos) {
          const dateTimeline = new Date(turno.hora);
          const date = new Date(turnoEnabled.hora);
          if (dateTimeline.getHours() === date.getHours() &&
            dateTimeline.getMinutes() === date.getMinutes()) {
            turnoEnabled.enabled = true;
            turno = turnoEnabled;
          }
        }
        this.timeline.push(turno);
      }
    }

    let date = new Date().setHours(maxHour, baseMin, 0, 0);
    let turno = new Turno();
    turno.hora = date;
    this.timeline.push(turno);

  }

  public showTurnoModal(turno: Turno) {
    if (!turno.enabled) {
      return;
    }
    this.turno = turno;

    this.turnoModal.show();
    let steps: any[] = this.storeService.get('steps');
    if (steps && steps[2]) {
      steps[2] = {
        label: steps[2].label,
        ngClass: 'btn-success'
      }
    }
  }

  public reservarTurno(turno: Turno) {

    if (!this.form.valid) {
      for (const key in this.form.controls) this.form.controls[key].markAsTouched(true);
      return;
    }

    this.turnoModal.hide();
    const especialidad = this.storeService.get('especialidad');
    turno.tomado = true;
    turno.motivoTurno = this.form.value.motivo;
    turno.plan = this.form.value.plan;
    turno.especialidad = especialidad;

    delete turno.centroSalud;
    delete turno.motivoTurno.preparacion;

    if (!this.persona) {
      const contactos: Contacto[] = [
        {tipoContacto: 'telefono', dato: this.form.value.telefono},
        {tipoContacto: 'mail', dato: this.form.value.email},
      ];

      const documento: Documento = new Documento();
      documento.tipoDocumento = TipoDocumentos.findByLabel('DNI');
      documento.numero = this.form.value.numeroDocumento;

      const persona: any = {
        apellido: this.form.value.apellido,
        nombre: this.form.value.nombre,
        documento: documento,
        contacto: contactos,
        plan: this.form.value.plan,
      };

      this.personaService.create(persona)
        .then((data) => {
          this.persona = data;
          return this.turnoService.reservarTurno(turno, this.persona)
        })
        .then(() => this.successModal.show());
     this.resetState();
      return;
    }

    this.turnoService.reservarTurno(turno, this.persona).then(() => this.successModal.show());
    this.resetState();
  }

  resetState(){
    this.isFieldsetEnabled = false;
    this.form.reset();
    this.buildTimeline([]);
  }

  handleTurnoModal(event) {
    this.turnoModal = event;
  }

  handleSuccessModal(event) {
    this.successModal = event;
  }

  handleMotivo(motivo) {
    this.motivoTurno = motivo;
  }

  getEspecialidad(turno): string {
    if (!turno || !this.especialidades) return '';
    for (const especialidad of this.especialidades) {
      if (especialidad.id === turno.profesional.especialidadId) return especialidad.nombre || '';
    }
    return '';
  }

  fetchPerson(numeroDocumento: number) {
    this.personaService.getPaciente(numeroDocumento)
      .then((data: any) => {

        this.isFieldsetEnabled = true;

        if (!data) return;

        if (data.status) return;

        this.persona = data;

        let telefono = null;
        if (data.contacto && data.contacto[0]) telefono = data.contacto[0].dato || null;

        const apellido = data.apellido || null;
        const nombre = data.nombre || null;
        let plan: Plan = data.plan || null;
        let obraSocial = null;
        this.obras_sociales.forEach(os => {
          os.planes.forEach(mPlan => {
            if (mPlan.id === plan.id) {
              obraSocial = os;
              this.planes = os.planes;
            }
          });
        });

        plan = this.planes.find(x => x.id === plan.id);

        this.form = this.fb.group({
          'numeroDocumento': [numeroDocumento, Validators.required],
          'telefono': [telefono, Validators.required],
          'apellido': [apellido, Validators.required],
          'nombre': [nombre, Validators.required],
          'obraSocial': [obraSocial, Validators.required],
          'plan': [plan, Validators.required],
          'motivo': [null, Validators.required],
          'email': [null],
        });

      })
  }

}
