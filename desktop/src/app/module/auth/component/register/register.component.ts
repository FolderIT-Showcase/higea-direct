import {Component, Input, OnInit} from '@angular/core';
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
  @Input()
  plan: Plan;
  tipoDocumentos: string[] = TipoDocumentos.build();
  generos: string[] = Generos.build();
  captcha = null;
  selectUndefined: any;
  @Input()
  validatorPlan: any [] = [];

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

    this.complexForm = fb.group({
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
      'numeroDocumento': [null, Validators.required],
      'tipoDocumento': [null, Validators.required],
      'pais': [null, Validators.required],
      'genero': [null, Validators.required],
      'password1': [null, Validators.required],
      'password2': [null, [Validators.required, this.passwordMatch]],
      'email': [null, Validators.required],
      'telefono': [null, Validators.required],
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

    /*this.metadataService.getAllEstadoCiviles().then((data: any) => {
      this.generos = data;
    });*/
  }

  private passwordMatch() {
    return (c: FormControl) => {
      return (c.value === this.complexForm.value.password1) ? null : {'passwordMatch': {valid: false}};
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
    user.email = data.email;

    const persona: Persona = new Persona();
    persona.userAsociado = user;
    persona.genero = data.genero.toUpperCase();
    persona.documento = new Documento();
    persona.documento.id = null;
    persona.documento.numero = data.numeroDocumento;
    persona.documento.tipoDocumento = TipoDocumentos.findByLabel(data.tipoDocumento);
    persona.nombre = data.nombre;
    persona.apellido = data.apellido;

    persona.contacto = [];
    const contacto: Contacto = new Contacto('telefono', data.telefono);
    persona.contacto.push(contacto);

    if (data.plan) persona.plan = data.plan;
    persona.nroAfiliado = data.nroAfiliado;

    return persona;
  }

  submitForm(data: any) {

    const persona: Persona = this.buildPersonaUser(data);

    if (!this.captcha) {
      return;
    }

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
        this.router.navigate(['/login']).then(() => {
          this.alertService.success('Registro Exitoso, chequee su cuenta de email para activar el usuario');
        });
      });
  }

  handleCorrectCaptcha(event) {
    this.captcha = event;
  }

  handleObraSocialClick(obra_social: ObraSocial) {
    this.planes = obra_social.planes;

    this.complexForm = this.fb.group({
      'nombre': [this.complexForm.value.nombre, Validators.required],
      'apellido': [this.complexForm.value.apellido, Validators.required],
      'numeroDocumento': [this.complexForm.value.numeroDocumento, Validators.required],
      'tipoDocumento': [this.complexForm.value.tipoDocumento, Validators.required],
      'pais': [this.complexForm.value.pais, Validators.required],
      'genero': [this.complexForm.value.genero, Validators.required],
      'password1': [this.complexForm.value.password1, Validators.required],
      'password2': [this.complexForm.value.password2, [Validators.required, this.passwordMatch]],
      'email': [this.complexForm.value.email, Validators.required],
      'telefono': [this.complexForm.value.telefono, Validators.required],
      'obraSocial': [this.complexForm.value.obraSocial],
      'plan': [this.complexForm.value.plan, Validators.required],
      'nroAfiliado': [this.complexForm.value.nroAfiliado, Validators.required],
    }, {validator: this.passwordMatcher});
  }

}
