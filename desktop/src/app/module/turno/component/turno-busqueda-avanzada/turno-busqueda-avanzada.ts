import {Component, OnDestroy, OnInit} from '@angular/core';
import {CentroSalud} from '../../../../domain/centro-salud';
import {Especialidad} from '../../../../domain/especialidad';
import {Profesional} from '../../../../domain/profesional';
import {Persona} from '../../../../domain/persona';
import {StoreService} from '../../../../service/store.service';
import {TurnoService} from '../../../../service/turno.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IMyOptions} from 'mydatepicker';
import {DatePipe} from '@angular/common';
import {AlertService} from '../../../../service/alert.service';

@Component({
  selector: 'app-turno-busqueda-avanzada',
  templateUrl: './turno-busqueda-avanzada.html'
})
export class TurnoBusquedaAvanzadaComponent implements OnInit, OnDestroy {

  datePipe = new DatePipe('es-AR');
  centrosSalud: CentroSalud[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  personas: Persona[] = [];
  selectUndefined: any;
  form: FormGroup;
  fechaDesde: Date = new Date();

  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(private storeService: StoreService,
              private alertService: AlertService,
              private turnoService: TurnoService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.personas = this.storeService.get('integrantes');
    this.centrosSalud = this.storeService.get('centrosSalud');

    this.form = this.fb.group({
      'persona': [null],
      'centro': [null, Validators.required],
      'fecha': [null, Validators.required],
      'especialidad': [null],
      'profesional': [null]
    });
    this.form.value.fechaDesde = new Date();
  }

  ngOnDestroy() {
    this.storeService.update('CentroSalud', null);
    this.storeService.update('turnos', []);
  }

  handlePersonaClick(persona: Persona) {
    this.storeService.update('persona', persona);
  }

  handleCentroSaludClick(centroSalud: CentroSalud) {
    this.especialidades = centroSalud.especialidad;
  }

  labelPersona(persona: Persona) {
    if (!persona) {
      return;
    }
    return (persona.nombre + ' ' + persona.apellido).toUpperCase();
  }

  handleEspecialidadClick(especialidad: Especialidad) {
    this.profesionales = especialidad.profesional;
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

    form.fecha = this.timeStampToDate(form.fecha.epoc);
    this.turnoService.getTurnos(form.centro, form.especialidad, form.profesional, form.fecha);
  }

  timeStampToDate(timestamp) {
    let date: any = new Date(timestamp * 1000);
    date = this.datePipe.transform(date, 'yyyy-MM-dd');
    return date;
  }

}
