import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PersonaService} from '../../../../service/persona.service';
import {AlertService} from '../../../../service/alert.service';
import {TipoDocumentos} from '../../../../domain/enums/tipo-documento';
import {Generos} from '../../../../domain/enums/genero';
import {Pais} from '../../../../domain/pais';
import {User} from '../../../../domain/user';
import {Persona} from '../../../../domain/persona';
import {Documento} from '../../../../domain/documento';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MetadataService} from '../../../../service/metadata.service';
import {Contacto} from '../../../../domain/contacto';
import {ObraSocial} from '../../../../domain/obra-social';
import {Plan} from '../../../../domain/plan';

@Component({
  selector: 'app-register-social',
  templateUrl: './register-social.component.html'
})
export class RegisterSocialComponent implements OnInit {

  complexForm: FormGroup;

  paises: Pais[] = [];
  obras_sociales: ObraSocial[] = [];
  obraSocial: ObraSocial;
  planes: Plan[] = [];
  plan: Plan;
  tipoDocumentos: string[] = TipoDocumentos.build();
  generos: string[] = Generos.build();
  captcha = null;
  selectUndefined: any;
  tieneObraSocial = false;

  user: User = JSON.parse(localStorage.getItem('socialUser'));

  constructor(private fb: FormBuilder,
              private router: Router,
              private metadataService: MetadataService,
              private personaService: PersonaService,
              private alertService: AlertService) {



    this.complexForm = fb.group({
      'nombre': [this.user.firstName, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'apellido': [this.user.lastName, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'telefono': [null, Validators.required],
      'tipoDocumento': [null],
      'numeroDocumento': [null, Validators.required],
      'genero': [null, Validators.required],
      'obraSocial': [null],
      'plan': [null],
      'nroAfiliado': [null],
    });

  }

  ngOnInit(): void {

    this.metadataService.getPaises().then((data: any) => {
      this.paises = data;
    });
    this.metadataService.getObrasSociales().then((data: any) => {
      this.obras_sociales = data;
      this.getParticularPlan();
    });
  }

  buildPersonaUser(data) {

    const persona: Persona = new Persona();
    persona.userAsociado = this.user;

    persona.genero = data.genero.toUpperCase();
    persona.documento = new Documento();
    persona.documento.id = null;
    persona.documento.numero = data.numeroDocumento;
    persona.documento.tipoDocumento = TipoDocumentos.findByLabel(data.tipoDocumento);
    if (!data.tipoDocumento) persona.documento.tipoDocumento = TipoDocumentos.findByLabel('DNI');
    persona.nombre = data.nombre;
    persona.apellido = data.apellido;

    persona.contacto = [];
    const contacto: Contacto = new Contacto('telefono', data.telefono);
    persona.contacto.push(contacto);

    if (data.plan) persona.plan = data.plan;
    if (!this.tieneObraSocial) {
      persona.plan = this.getParticularPlan();
    }
    persona.nroAfiliado = data.nroAfiliado;

    return persona;
  }

  getParticularPlan(): Plan {
    let plan: Plan;
    for (let obraSocial of this.obras_sociales) {
      if (obraSocial && obraSocial.nombre && obraSocial.nombre.toLowerCase() === 'particular') {
        plan = obraSocial.planes[0];
      }
    }
    return plan;
  }

  submitForm(data: any) {

    if (!this.complexForm.valid) {

      this.complexForm.controls['nombre'].markAsTouched(true);
      this.complexForm.controls['apellido'].markAsTouched(true);
      this.complexForm.controls['telefono'].markAsTouched(true);
      this.complexForm.controls['tipoDocumento'].markAsTouched(true);
      this.complexForm.controls['numeroDocumento'].markAsTouched(true);
      this.complexForm.controls['genero'].markAsTouched(true);
      if (this.tieneObraSocial) {
        this.complexForm.controls['obraSocial'].markAsTouched(true);
        this.complexForm.controls['plan'].markAsTouched(true);
        this.complexForm.controls['nroAfiliado'].markAsTouched(true);
      }

      return;

    }

    const persona: Persona = this.buildPersonaUser(data);

    // if (!this.captcha) {
    //   return;
    // }

    this.savePersona(persona);

  }

  savePersona(persona: Persona) {
    this.personaService.create(persona)
      .then(() => {
        this.router
          .navigate(['/login'])
          .then(() => {
            this.alertService.success('Registro Exitoso, chequee su cuenta de email para activar el usuario');
          })
      });
  }

  handleCorrectCaptcha(event) {
    this.captcha = event;
  }

  handleObraSocialClick(obra_social: ObraSocial) {
    this.planes = obra_social.planes;
  }

  eventClickOS(event) {

    this.tieneObraSocial = !this.tieneObraSocial;
    if (this.tieneObraSocial) {
      this.complexForm = this.fb.group({
        'nombre': [this.complexForm.value.nombre, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'apellido': [this.complexForm.value.apellido, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'telefono': [this.complexForm.value.telefono, Validators.required],
        'numeroDocumento': [this.complexForm.value.numeroDocumento, Validators.required],
        'genero': [this.complexForm.value.genero, Validators.required],
        'obraSocial': [this.complexForm.value.obraSocial, Validators.required],
        'plan': [this.complexForm.value.plan, Validators.required],
        'nroAfiliado': [this.complexForm.value.nroAfiliado],
      });
    } else {

      this.complexForm = this.fb.group({
        'nombre': [this.complexForm.value.nombre, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'apellido': [this.complexForm.value.apellido, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'telefono': [this.complexForm.value.telefono, Validators.required],
        'numeroDocumento': [this.complexForm.value.numeroDocumento, Validators.required],
        'genero': [this.complexForm.value.genero, Validators.required],
        'obraSocial': [this.complexForm.value.obraSocial],
        'plan': [this.complexForm.value.plan],
        'nroAfiliado': [this.complexForm.value.nroAfiliado],
      });
    }

  }

}
