import {Component, OnDestroy, OnInit} from '@angular/core';
import {Especialidad} from '../../../domain/especialidad';
import {Profesional} from '../../../domain/profesional';
import {Persona} from '../../../domain/persona';
import {StoreService} from '../../../service/store.service';
import {TurnoService} from '../../../service/turno.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MetadataService} from '../../../service/metadata.service';
import {AlertService} from '../../../service/alert.service';
import {Subscription} from 'rxjs/Subscription';
import {IMyOptions} from '../../datepicker/interfaces/my-options.interface';
import {Util} from '../../../service/utils.service';

@Component({
  selector: 'app-turno-busqueda-avanzada-external',
  templateUrl: './turno-busqueda-external.component.html'
})
export class TurnoBusquedaAvanzadaExternalComponent implements OnInit, OnDestroy {

  datePipe = new DatePipe('es-AR');
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  filteredProfesionales: Profesional[] = [];
  personas: Persona[] = [];
  form: FormGroup;
  subs: Subscription[] = [];
  calendarDate = new Date();
  markedDays = [];

  currentEspecialidad: Especialidad = null;

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

    this.buildForm();

    this.personas = this.storeService.get('integrantes');

    this.metadataService.getEspecialidades()
      .then(data => {
        this.especialidades = data;
        this.buildForm();
        this.subscribeFormChanges();
      })
  }

  subscribeFormChanges() {
    this.subs.push(
      this.form.valueChanges.subscribe(data => {
        if (!data) return;

        if (data.especialidad && this.currentEspecialidad && data.especialidad.id !== this.currentEspecialidad.id) {
          delete data.profesional;
          let steps: any[] = this.storeService.get('steps');
          steps[1] = {
            label: steps[1].label,
            ngClass: 'btn-warning',
            order: 2
          };
          steps[2] = {
            label: steps[1].label,
            ngClass: 'btn-warning',
            order: 3
          };
          steps[3] = {
            label: steps[1].label,
            ngClass: 'btn-warning',
            order: 4
          };
          this.markedDays = [];
        }

        if (data.especialidad) {
          let steps: any[] = this.storeService.get('steps');
          if (steps && steps[0]) {
            steps[0] = {
              label: steps[0].label,
              ngClass: 'btn-success'
            }
          }
        }

        if (data.especialidad && data.profesional && data.profesional.id) {
          this.getMarkedDays(data);
          let steps: any[] = this.storeService.get('steps');
          if (steps && steps[1]) {
            steps[1] = {
              label: steps[1].label,
              ngClass: 'btn-success'
            }
          }
        }

        if (data.fecha && this.form.valid) {
          if (!this.markedDays.find(x => x === data.fecha.date.day.toString())) {
            this.storeService.update('validDayFlag', false);
            return;

          }

          this.storeService.update('validDayFlag', true);

          this.submitForm(this.form.value);
          let steps: any[] = this.storeService.get('steps');
          if (steps && steps[2]) {
            steps[2] = {
              label: steps[2].label,
              ngClass: 'btn-success'
            }
          }
        }
      })
    );
  }

  buildForm() {
    this.form = this.fb.group({
      'fecha': [null, Validators.required],
      'especialidad': [Util.getFirstDefault(this.especialidades)],
      'profesional': [null, Validators.required]
    });

  }

  buildEspecialidades() {
    let especialidadesTmp = [];
    for (let i in this.profesionales) {
      for (let j in this.especialidades) {
        if (this.profesionales[i].especialidadId === this.especialidades[j].id) {
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
  }

  ngOnDestroy() {
    this.storeService.update('turnos', []);
    this.subs.forEach(x => x.unsubscribe());
  }

  labelPersona(persona: Persona) {
    if (!persona) return;
    return (`${persona.nombre} ${persona.apellido}`).toUpperCase();
  }

  handleEspecialidadClick(especialidad: Especialidad) {
    this.form.controls['profecional'].reset();
    this.currentEspecialidad = especialidad;
    if (especialidad && especialidad.profesional) {
      this.filteredProfesionales = especialidad.profesional.sort((a, b) => {
        return (a.apellido + a.nombre > b.apellido + b.nombre) ? 1 : ((b.apellido + b.nombre > a.apellido + a.nombre) ? -1 : 0);
      });
    } else {
      this.filteredProfesionales = [];
    }
  }

  onSingleItemDetect(especialidad: Especialidad) {
    if (especialidad && especialidad.profesional) {
      this.filteredProfesionales = especialidad.profesional.sort((a, b) => {
        return (a.apellido + a.nombre > b.apellido + b.nombre) ? 1 : ((b.apellido + b.nombre > a.apellido + a.nombre) ? -1 : 0);});

      let steps: any[] = this.storeService.get('steps');
      if (steps && steps[0]) {
        steps[0] = {
          label: steps[0].label,
          ngClass: 'btn-success'
        }
      }
    }

  }

  submitForm(form) {

    if (!form.fecha || !form.fecha.epoc) return;

    const fechaDesde = form.fecha.epoc * 1000;
    const ahora = new Date().setHours(0, 0, 0, 0);
    const fechaTurno = new Date(fechaDesde).setHours(0, 0, 0, 0);

    if (!(fechaTurno >= ahora)) {
      this.alertService.error('No puede sacar un turno con fecha invalida, verifique');
      return;
    }

    const especialidad: Especialidad = Object.assign({}, form.especialidad);
    delete especialidad.profesional;
    form.especialidad = Object.assign({}, especialidad);
    this.storeService.update('especialidad', especialidad);
    this.storeService.update('profesional', form.profesional);
    this.storeService.update('fecha', this.timeStampToDate(form.fecha.epoc * 1000));
    if (form.especialidad && form.profesional) {
      this.turnoService.getTurnos(form.centro, form.especialidad, form.profesional, form.fecha.epoc * 1000);
    }
  }

  timeStampToDate(timestamp, format = 'yyyy-MM-dd') {
    return this.datePipe.transform(timestamp, format);
  }

  datetoDay(mDate) {
    const strDate = mDate.split('-');
    let date: any = new Date(strDate[0], strDate[1] - 1, strDate[2]);
    date = this.datePipe.transform(date, 'dd');
    return date;
  }

  calendarChange(event) {
    this.calendarDate.setMonth(event.month - 1);
    if (!this.form || !this.form.value || !this.form.value.profesional) return;
    this.getMarkedDays(this.form.value);
  }

  getMarkedDays(data) {
    this.turnoService.getCalendario(data.profesional, this.timeStampToDate(this.calendarDate))
      .then(data => {
        this.markedDays = [];
        data.forEach(x => this.markedDays.push(this.datetoDay(x.calendario_fecha)));
      });
  }

}
