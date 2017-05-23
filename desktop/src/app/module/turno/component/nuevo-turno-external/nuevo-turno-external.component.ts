import {Component, OnDestroy, OnInit} from '@angular/core';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {Especialidad} from '../../../core/domain/especialidad';
import {Profesional} from '../../../core/domain/profesional';
import {Persona} from '../../../core/domain/persona';
import {StoreService} from '../../../core/service/store.service';
import {TurnoService} from '../../../core/service/turno.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IMyOptions} from 'mydatepicker';
import {DatePipe} from '@angular/common';

class Data {
  persona: Persona;
  centro: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  fecha: Date = new Date();
}

@Component({
  selector: 'app-nuevo-turno-external',
  templateUrl: './nuevo-turno-external.component.html'
})
export class NuevoTurnoExternalComponent implements OnInit, OnDestroy {

  datePipe = new DatePipe('es-AR');
  model: Data = new Data();
  // centrosSalud: CentroSalud[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  personas: Persona[] = [];
  selectUndefined: any;
  form: FormGroup;
  fechaDesde: Date = new Date();
  centroSalud: string = localStorage.getItem('client');

  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(private storeService: StoreService,
              private turnoService: TurnoService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.personas = this.storeService.get('integrantes');
    // this.centrosSalud = this.storeService.get('centrosSalud');

    this.form = this.fb.group({
      'persona': [null],
      'centro': [Validators.required],
      'fecha': [null],
      'especialidad': [null],
      'profesional': [null]
    });
    this.form.value.fechaDesde = new Date();
    this.especialidades = this.storeService.get('especialidades');
  }

  ngOnDestroy() {
    this.storeService.update('CentroSalud', null);
    this.storeService.update('turnos', []);
  }

  handlePersonaClick(persona: Persona) {
    this.storeService.update('persona', persona);
  }

  labelPersona(persona: Persona) {
    if (!persona) {
      return;
    }
    return (persona.nombre + ' ' + persona.apellido).toUpperCase();
  }

  handleCentroSaludClick(centroSalud: CentroSalud) {
    this.especialidades = centroSalud.especialidad;
  }

  handleEspecialidadClick(especialidad: Especialidad) {
    this.profesionales = especialidad.profesional;
  }

  submitForm(form) {
    form.fecha = this.timeStampToDate(form.fecha.epoc);
    this.turnoService.getTurnos(form.centro, form.especialidad, form.profesional, form.fecha);
  }

  timeStampToDate(timestamp) {
    let date: any = new Date(timestamp * 1000);
    date = this.datePipe.transform(date, 'yyyy-MM-dd');
    return date;
  }

}
