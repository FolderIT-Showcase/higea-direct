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

  markedDays = [23, 24, 26, 27, 29, 30];

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
          console.log(date);
          this.turnoService.getCalendario(data.profesional, this.timeStampToDate(this.calendarDate))
            .then((data: any[]) => {
              this.markedDays = [];
              data.forEach(x => this.markedDays.push(this.datetoDay(x.calendario_fecha)));
            });
        }
        if (data.fecha && this.form.valid) {
          this.submitForm(this.form.value);
        }
      })
    );

  }

  ngOnDestroy() {
    this.storeService.update('CentroSalud', null);
    this.storeService.update('turnos', []);
    this.subs.forEach(x => x.unsubscribe());
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
      return (a.nombre + a.apellido > b.nombre + b.apellido) ? 1 : ((b.nombre + b.apellido > a.nombre + a.apellido) ? -1 : 0);
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

    // form.fecha = this.timeStampToDate(form.fecha.epoc);
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
    let date: any = new Date(mDate);
    date = this.datePipe.transform(date, "dd");
    return date;
  }

  calendarChange(event) {
    console.log(event.month-1);
    this.calendarDate.setMonth(event.month);
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
