import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PersonaService} from '../../../core/service/persona.service';
import {AlertService} from '../../../core/service/alert.service';
import {TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {Generos} from '../../../core/domain/enums/genero';
import {Pais} from '../../../core/domain/pais';
import {User} from '../../../core/domain/user';
import {Persona} from '../../../core/domain/persona';
import {Documento} from '../../../core/domain/documento';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MetadataService} from '../../../core/service/metadata.service';
import {Contacto} from '../../../core/domain/contacto';
import {ObraSocial} from '../../../core/domain/obra-social';
import {Plan} from '../../../core/domain/plan';

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
      'plan': [null]
    }, {validator: this.passwordMatcher});

  }

  ngOnInit(): void {
    this.metadataService.getPaises().then((data: any) => {
      this.paises = data;
    }).catch(() => {});
    this.metadataService.getObrasSociales().then((data: any) => {
      this.obras_sociales = data;
    }).catch(() => {});
  }

  private passwordMatch() {
    return (c: FormControl) => {
      return (c.value === this.complexForm.value.password1) ? null : {'passwordMatch': {valid: false}};
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
        }).catch(() => {});

      return;
    }

    this.savePersona(persona);

  }

  savePersona(persona: Persona) {
    this.personaService.create(persona)
      .then(() => {
        this.router.navigate(['/login'])
          .then(() => {
            this.alertService.success('Registro Exitoso, chequee su cuenta de email para activar el usuario');
          }).catch(() => {});
      }).catch(() => {});
  }

  handleCorrectCaptcha(event) {
    this.captcha = event;
  }

  handleObraSocialClick(obra_social: ObraSocial) {
    this.planes = obra_social.planes;
  }

}
