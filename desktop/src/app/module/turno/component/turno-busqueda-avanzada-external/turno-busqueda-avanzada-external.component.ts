import {Component, OnDestroy, OnInit} from '@angular/core';
import {CentroSalud} from '../../../../domain/centro-salud';
import {Especialidad} from '../../../../domain/especialidad';
import {Profesional} from '../../../../domain/profesional';
import {Persona} from '../../../../domain/persona';
import {StoreService} from '../../../../service/store.service';
import {TurnoService} from '../../../../service/turno.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MetadataService} from '../../../../service/metadata.service';
import {AlertService} from '../../../../service/alert.service';
import {Subscription} from 'rxjs/Subscription';
import {IMyOptions} from '../../../my-date-picker/interfaces/my-options.interface';

class Data {
  persona: Persona;
  centro: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  fecha: Date = new Date();
}

@Component({
  selector: 'app-turno-busqueda-avanzada-external',
  templateUrl: './turno-busqueda-avanzada-external.component.html'
})
export class TurnoBusquedaAvanzadaExternalComponent implements OnInit, OnDestroy {

  datePipe = new DatePipe('es-AR');
  model: Data = new Data();
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  filteredProfesionales: Profesional[] = [];
  personas: Persona[] = [];
  form: FormGroup;
  fechaDesde: Date = new Date();
  centroSalud: string = localStorage.getItem('client');
  subs: Subscription[] = [];

  calendarDate = new Date();

  markedDays = [];

  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
    sunHighlight: true,
    showTodayBtn: false,
    inline: true
  };

  constructor(private storeService: StoreService,
              private metadataService: MetadataService,
              private alertService: AlertService,
              private turnoService: TurnoService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.personas = this.storeService.get('integrantes');
    const date = new Date();
    this.form = this.fb.group({
      'persona': [this.personas[0], Validators.required],
      'fecha': [null, Validators.required],
      'especialidad': [null],
      'profesional': [null, Validators.required]
    });
    this.form.value.fechaDesde = new Date();

    this.metadataService.getEspecialidades()
      .then(data => {
        this.especialidades = data;
        return this.metadataService.getProfesionales();
      })
      .then(data => {
        this.profesionales = data;

        let especialidadesTmp = [];

        for (let i in this.profesionales) {
          for (let j in this.especialidades) {
            if (this.profesionales[i].especialidadId == this.especialidades[j].id) {
              this.especialidades[j].profesional.push(this.profesionales[i]);
            }
          }
        }

        for (let j in this.especialidades) {
          if (this.especialidades[j].profesional.length !== 0) {
            especialidadesTmp.push(this.especialidades[j]);
          }
        }

        this.especialidades = Object.assign([], especialidadesTmp);

      });

    this.subs.push(
      this.form.valueChanges.subscribe(data => {
        if (!data) return;

        if (data.especialidad && data.profesional && data.profesional.id) {
          this.getMarkedDays(data);
          if (data.persona && data.persona.id) {
            let steps: any[] = this.storeService.get('steps');
            if (steps && steps[0]) {
              steps[0] = {
                label: steps[0].label,
                ngClass: 'btn-success'
              }
            }
          }
        }
        if (data.fecha && this.form.valid) {
          this.submitForm(this.form.value);
          let steps: any[] = this.storeService.get('steps');
          if (steps && steps[1]) {
            steps[1] = {
              label: steps[1].label,
              ngClass: 'btn-success'
            }
          }
        }
      })
    );

  }

  ngOnDestroy() {
    this.storeService.update('CentroSalud', null);
    this.storeService.update('turnos', []);
    this.subs.forEach(x => x.unsubscribe());
  }

  getMarkedDays(data) {
    this.turnoService.getCalendario(data.profesional, this.timeStampToDate(this.calendarDate))
      .then(data => {
        this.markedDays = [];
        data.forEach(x => this.markedDays.push(this.datetoDay(x.calendario_fecha)));
      });
  }

  handlePersonaClick(persona: Persona) {
    this.storeService.update('persona', persona);
  }

  labelPersona(persona: Persona) {
    if (!persona) {
      return;
    }
    return (`${persona.nombre} ${persona.apellido}`).toUpperCase();
  }

  handleCentroSaludClick(centroSalud: CentroSalud) {
    this.especialidades = centroSalud.especialidad;
  }

  handleEspecialidadClick(especialidad: Especialidad) {
    this.filteredProfesionales = especialidad.profesional.sort((a, b) => {
      return (a.apellido + a.nombre > b.apellido + b.nombre) ? 1 : ((b.apellido + b.nombre > a.apellido + a.nombre) ? -1 : 0);
    });
  }

  submitForm(form) {
    if (!form.fecha || !form.fecha.epoc) {
      return;
    }

    const fechaDesde = form.fecha.epoc * 1000;

    const ahora = new Date().setHours(0, 0, 0, 0);
    const fechaTurno = new Date(fechaDesde).setHours(0, 0, 0, 0);

    if (!(fechaTurno >= ahora)) {
      this.alertService.error('No puede sacar un turno con fecha invalida, verifique');
      return;
    }

    const especialidad: Especialidad = Object.assign({}, form.especialidad);
    especialidad.profesional = null;
    form.especialidad = Object.assign({}, especialidad);
    this.turnoService.getTurnos(form.centro, form.especialidad, form.profesional, form.fecha.epoc * 1000);
  }

  timeStampToDate(timestamp) {
    let date: any = timestamp;
    date = this.datePipe.transform(date, "yyyy-MM-dd");
    return date;
  }

  datetoDay(mDate) {
    const strDate = mDate.split('-');
    let date: any = new Date(strDate[0], strDate[1] - 1, strDate[2]);
    date = this.datePipe.transform(date, "dd");
    return date;
  }

  calendarChange(event) {
    this.calendarDate.setMonth(event.month - 1);
    if (!this.form || !this.form.value || !this.form.value.profesional) {
      return;
    }
    this.turnoService.getCalendario(this.form.value.profesional, this.timeStampToDate(this.calendarDate))
      .then((data: any[]) => {
        this.markedDays = [];
        data.forEach(x => this.markedDays.push(this.datetoDay(x.calendario_fecha)));
      });
  }

}
