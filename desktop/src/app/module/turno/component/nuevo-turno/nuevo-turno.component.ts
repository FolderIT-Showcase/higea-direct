import {Component, OnInit} from '@angular/core';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {Especialidad} from '../../../core/domain/especialidad';
import {Profesional} from '../../../core/domain/profesional';
import {Persona} from '../../../core/domain/persona';
import {StoreService} from '../../../core/service/store.service';
import {TurnoService} from '../../../core/service/turno.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

class Data {
  persona: Persona;
  centro: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  fecha: Date = new Date();
}

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html'
})
export class NuevoTurnoComponent implements OnInit {

  model: Data = new Data();
  centrosSalud: CentroSalud[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  personas: Persona[] = [];
  selectUndefined: any;
  form: FormGroup;
  fechaDesde: Date = new Date();

  constructor(private storeService: StoreService,
              private turnoService: TurnoService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.personas = this.storeService.get('integrantes');
    this.centrosSalud = this.storeService.get('centrosSalud');

    this.form = this.fb.group({
      'persona': [null],
      'centro': [Validators.required],
      'especialidad': [null],
      'profesional': [null]
    });
    this.form.value.fechaDesde = new Date();
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

  handleProfesionalClick(profesional: Profesional) {

  }

  handleFechaChange(event) {
    console.log(event);
  }

  submitForm(form) {
    form.fechaDesde = this.fechaDesde;
    console.log(form);
    this.turnoService.getTurnos(form.centro, form.especialidad, form.profesional, form.fecha);
  }

  clearForm() {
    this.storeService.update('CentroSalud', null);
    this.storeService.update('turnos', []);
  }

}
