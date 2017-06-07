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
import {LoadingService} from '../../../../service/loading.service';
import {MetadataService} from '../../../../service/metadata.service';

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
  selectUndefined: any;
  form: FormGroup;
  fechaDesde: Date = new Date();
  centroSalud: string = localStorage.getItem('client');

  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(private storeService: StoreService,
              private metadataService: MetadataService,
              private loading: LoadingService,
              private turnoService: TurnoService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loading.start();
    console.log(('start'));

    this.personas = this.storeService.get('integrantes');

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
    return (`${persona.nombre} ${persona.apellido}`).toUpperCase();
  }

  handleCentroSaludClick(centroSalud: CentroSalud) {
    this.especialidades = centroSalud.especialidad;
  }

  handleEspecialidadClick(especialidad: Especialidad) {
    this.filteredProfesionales = especialidad.profesional;
  }

  submitForm(form) {
    // TODO validar fecha
    form.fecha = this.timeStampToDate(form.fecha.epoc);
    this.turnoService.getTurnos(form.centro, form.especialidad, form.profesional, form.fecha);
  }

  timeStampToDate(timestamp) {
    let date: any = new Date(timestamp * 1000);
    date = this.datePipe.transform(date, 'yyyy-MM-dd');
    return date;
  }

}
