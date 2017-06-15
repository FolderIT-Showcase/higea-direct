import {Component, OnDestroy, OnInit} from '@angular/core';
import {CentroSalud} from '../../../../domain/centro-salud';
import {Especialidad} from '../../../../domain/especialidad';
import {Persona} from '../../../../domain/persona';
import {Profesional} from '../../../../domain/profesional';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StoreService} from '../../../../service/store.service';
import {TurnoService} from '../../../../service/turno.service';
import {IMyOptions} from '../../../my-date-picker/interfaces/my-options.interface';

@Component({
  selector: 'app-turno-busqueda-rapida',
  templateUrl: './turno-busqueda-rapida.component.html'
})
export class TurnoBusquedaRapidaComponent implements OnInit, OnDestroy {

  centrosSalud: CentroSalud[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  personas: Persona[] = [];
  selectUndefined: any;
  form: FormGroup;

  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(private storeService: StoreService,
              private turnoService: TurnoService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.personas = this.storeService.get('integrantes');
    this.centrosSalud = this.storeService.get('centrosSalud');

    this.form = this.fb.group({
      'persona': [null, Validators.required],
      'centro': [null, Validators.required],
      'especialidad': [null],
      'profesional': [null]
    });
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
    this.turnoService.getProximosTurnos(form.centro, form.especialidad, form.profesional);
  }

}
