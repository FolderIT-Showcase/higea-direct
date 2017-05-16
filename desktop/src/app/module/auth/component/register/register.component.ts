import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PersonaService} from '../../../core/service/persona.service';
import {AlertService} from '../../../core/service/alert.service';
import {TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {Generos} from '../../../core/domain/enums/genero';
import {Pais} from '../../../core/domain/pais';
import {User} from '../../../core/domain/user';
import {Persona} from '../../../core/domain/persona';
import {Documento} from '../../../core/domain/documento';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingService} from '../../../core/service/loading.service';
import {MetadataService} from '../../../core/service/metadata.service';

class Data {
  nombre = '';
  apellido = '';
  pais = '';
  tipoDocumento = '';
  numeroDocumento: number;
  genero = '';
  password1 = '';
  password2 = '';
  email = '';
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

  complexForm: FormGroup;

  model: Data = new Data;
  paises: Pais[] = [];
  tipoDocumentos: string[] = TipoDocumentos.build();
  generos: string[] = Generos.build();
  loading = false;
  captcha: string = null;

  constructor(private fb: FormBuilder,
              private loadingService: LoadingService,
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
      'password2': [null, Validators.required],
      'email': [null, Validators.required],
    });

  }

  ngOnInit(): void {
    this.metadataService.getPaises().then((data: any) => {
      this.paises = data;
    });
    this.model.tipoDocumento = this.tipoDocumentos[0];
    this.model.genero = this.generos[0];
  }

  ngOnDestroy(): void {
    this.captcha = null;
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

    return persona;
  }

  submitForm(data: any) {

    // if (!this.captcha) {
    //   this.alertService.error('Por Favor complete todos los datos');
    //   return;
    // }

    const persona: Persona = this.buildPersonaUser(data);

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
        this.router.navigate(['/login'])
          .then(() => {
            this.alertService.success('Registro Exitoso, chequee su cuenta de email para activar el usuario');
          });
      });
  }

  handleCorrectCaptcha(event) {
    this.captcha = event;
  }

}
