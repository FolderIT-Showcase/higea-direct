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
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MetadataService} from '../../../../service/metadata.service';
import {Contacto} from '../../../../domain/contacto';
import {ObraSocial} from '../../../../domain/obra-social';
import {Plan} from '../../../../domain/plan';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

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
  validatorPlan: any [] = [];
  tieneObraSocial = false;

  passwordMatcher = (control: AbstractControl): { [key: string]: boolean } => {
    const password1 = control.get('password1');
    const password2 = control.get('password2');
    if (!password1 || !password2) return null;
    return password1.value === password2.value ? null : {nomatch: true};
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private metadataService: MetadataService,
              private personaService: PersonaService,
              private alertService: AlertService) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.complexForm = fb.group({
      'nombre': [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'apellido': [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'email': [null, [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      'telefono': [null, Validators.required],
      'password1': [null, Validators.required],
      'password2': [null, [Validators.required, this.passwordMatch]],
      'tipoDocumento': [null],
      'numeroDocumento': [null, Validators.required],
      'genero': [null, Validators.required],
      'obraSocial': [null],
      'plan': [null],
      'nroAfiliado': [null],
    }, {validator: this.passwordMatcher});

  }

  ngOnInit(): void {
    this.metadataService.getPaises().then((data: any) => {
      this.paises = data;
    });
    this.metadataService.getObrasSociales().then((data: any) => {
      this.obras_sociales = data;
    });
  }

  private passwordMatch() {
    return (c: FormControl) => {
      return (c.value === this.complexForm.value.password1) ? null : {'passwordMatch': {valid: false}};
    }
  }

  private emailValidator() {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return (c: FormControl) => {
      return ( c.value !== '' && (c.value.length <= 5 || !EMAIL_REGEXP.test(c.value)) ) ? {'emailValidator': {valid: false}} : null;
    }
  }

  private planValid() {
    return (c: FormControl) => {
      return (c.value && this.complexForm.value.obraSocial) ? null : {'planValid': {valid: false}};
    }
  }

  buildPersonaUser(data) {
    const user: User = new User();
    user.password = data.password1;
    user.email = data.email.trim();

    const persona: Persona = new Persona();
    persona.userAsociado = user;

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
      console.log("Entrooo");
    }
    persona.nroAfiliado = data.nroAfiliado;

    return persona;
  }

  getParticularPlan(): Plan {
    let plan: Plan;
    for (let obraSocial of this.obras_sociales) {
      if (obraSocial.nombre === 'Particular') {

        plan = obraSocial.planes[0];
        console.log(plan.id);
      }
    }
    return plan;
  }

  submitForm(data: any) {

    if (!this.complexForm.valid) {

      this.complexForm.controls['nombre'].markAsTouched(true);
      this.complexForm.controls['apellido'].markAsTouched(true);
      this.complexForm.controls['email'].markAsTouched(true);
      this.complexForm.controls['telefono'].markAsTouched(true);
      this.complexForm.controls['password1'].markAsTouched(true);
      this.complexForm.controls['password2'].markAsTouched(true);
      this.complexForm.controls['tipoDocumento'].markAsTouched(true);
      this.complexForm.controls['numeroDocumento'].markAsTouched(true);
      this.complexForm.controls['genero'].markAsTouched(true);
      if (this.tieneObraSocial) {
        console.log(this.tieneObraSocial)
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

    if (persona.documento.tipoDocumento === 'dni') {

      const doc = {
        documento: persona.documento.numero,
        nombre: persona.nombre,
        apellido: persona.apellido,
        genero: persona.genero.slice(0, 1)
      };
      this.personaService.validateDni(doc)
        .then(() => {
          this.savePersona(persona);
        });

      return;
    }

    this.savePersona(persona);

  }

  savePersona(persona: Persona) {
    this.personaService.create(persona)
      .then(() => {
        this.alertService.success('Registro Exitoso, chequee su cuenta de email para activar el usuario');
        this.router.navigate(['/login']);
      });
  }

  handleCorrectCaptcha(event) {
    this.captcha = event;
  }

  handleObraSocialClick(obra_social: ObraSocial) {
    this.planes = obra_social.planes;
  }

  eventClickOS(event) {
    console.log(this.tieneObraSocial);
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.tieneObraSocial = !this.tieneObraSocial;
    if (this.tieneObraSocial) {
      this.complexForm = this.fb.group({
        'nombre': [this.complexForm.value.nombre, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'apellido': [this.complexForm.value.apellido, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'email': [this.complexForm.value.email, [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
        'telefono': [this.complexForm.value.telefono, Validators.required],
        'password1': [this.complexForm.value.password1, Validators.required],
        'password2': [this.complexForm.value.password2, [Validators.required, this.passwordMatch]],
        'tipoDocumento': [this.complexForm.value.tipoDocumento],
        'numeroDocumento': [this.complexForm.value.numeroDocumento, Validators.required],
        // 'pais': [this.paises.find(x => x.nombre.toLowerCase() === 'argentina'), Validators.required],
        'genero': [this.complexForm.value.genero, Validators.required],
        'obraSocial': [this.complexForm.value.obraSocial, Validators.required],
        'plan': [this.complexForm.value.plan, Validators.required],
        'nroAfiliado': [this.complexForm.value.nroAfiliado],
      }, {validator: this.passwordMatcher});
    } else {

      this.complexForm = this.fb.group({
        'nombre': [this.complexForm.value.nombre, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'apellido': [this.complexForm.value.apellido, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'email': [this.complexForm.value.email, [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
        'telefono': [this.complexForm.value.telefono, Validators.required],
        'password1': [this.complexForm.value.password1, Validators.required],
        'password2': [this.complexForm.value.password2, [Validators.required, this.passwordMatch]],
        'tipoDocumento': [this.complexForm.value.tipoDocumento],
        'numeroDocumento': [this.complexForm.value.numeroDocumento, Validators.required],
        // 'pais': [this.paises.find(x => x.nombre.toLowerCase() === 'argentina'), Validators.required],
        'genero': [this.complexForm.value.genero, Validators.required],
        'obraSocial': [this.complexForm.value.obraSocial],
        'plan': [this.complexForm.value.plan],
        'nroAfiliado': [this.complexForm.value.nroAfiliado],
      }, {validator: this.passwordMatcher});
    }

  }

}
