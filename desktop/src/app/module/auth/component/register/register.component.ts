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
import {StoreService} from '../../../core/service/store.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingService} from '../../../core/service/loading.service';

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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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
              private personaService: PersonaService,
              private alertService: AlertService,
              private storeService: StoreService) {

    this.complexForm = fb.group({
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
      'numeroDocumento': [null, Validators.required],
      'password1': [null, Validators.required],
      'password2': [null, Validators.required],
      'email': [null, Validators.required],
    });

    this.complexForm.valueChanges.subscribe((form: any) => {
      }
    );

  }

  submitForm(value: any) {
    this.model.nombre = value.nombre;
    this.model.apellido = value.apellido;
    this.model.numeroDocumento = value.numeroDocumento;
    this.model.password1 = value.password1;
    this.model.password2 = value.password2;
    this.model.email = value.email;
    this.register();
  }

  ngOnInit(): void {
    this.paises = this.storeService.get('paises');
    this.model.tipoDocumento = this.tipoDocumentos[0];
    this.model.genero = this.generos[0];
    this.model.pais = this.paises[11].nombre;
  }

  ngOnDestroy(): void {
    this.captcha = null;
  }

  public register() {
    const user: User = new User();
    user.password = this.model.password1;
    user.email = this.model.email;
    const persona: Persona = new Persona();
    persona.userAsociado = user;
    persona.genero = this.model.genero.toUpperCase();
    persona.documento = new Documento();
    persona.documento.tipo = PersonaService.convertTipoDocumento(this.model.tipoDocumento);
    persona.documento.numero = this.model.numeroDocumento;
    persona.nombre = this.model.nombre;
    persona.apellido = this.model.apellido;
    persona.domicilio = {};

    if (persona.documento.tipo === "dni") {

      const doc = {
        documento: persona.documento.numero,
        nombre: persona.nombre,
        apellido: persona.apellido,
        genero: persona.genero.slice(0, 1)
      };

      this.loadingService.start();
      this.personaService.validateDni(doc)
        .then(() => {
          this.loadingService.finish();
          this.savePersona(persona);
        })
        .catch(error => {
          this.loadingService.finish();
          this.alertService.error('Sus datos no son válidos, por favor revíselos.');
          console.error(error);
        });

      return;
    }

    this.savePersona(persona);
  }

  savePersona(persona: Persona) {
    this.loadingService.start();
    this.personaService.create(persona)
      .then(() => {
        this.router.navigate(['/login'])
          .then(() => {
            this.loadingService.finish();
            this.alertService.success('Registro Exitoso, chequee su cuenta de email para activar el usuario');
          });
      })
      .catch(error => {
        this.loadingService.finish();
        this.alertService.error('Hubo un error inesperado, vuelva a intentarlo más tarde');
      });
  }

  handleCountriesClick(pais: Pais) {
    this.model.pais = pais.nombre;
  }

  handleTipoDocumentoClick(tipoDocumento: string) {
    this.model.tipoDocumento = tipoDocumento;
  }

  handleGeneroClick(genero: string) {
    this.model.genero = genero;
  }

  handleCorrectCaptcha(event) {
    this.captcha = event;
  }

}
