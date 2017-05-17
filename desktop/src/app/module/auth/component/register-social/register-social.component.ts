import {Component, OnInit} from '@angular/core';
import {TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {Generos} from '../../../core/domain/enums/genero';
import {Pais} from '../../../core/domain/pais';
import {Router} from '@angular/router';
import {PersonaService} from '../../../core/service/persona.service';
import {AlertService} from '../../../core/service/alert.service';
import {User} from '../../../core/domain/user';
import {Persona} from '../../../core/domain/persona';
import {Documento} from '../../../core/domain/documento';
import {MetadataService} from '../../../core/service/metadata.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

class Datos {
  nombre = '';
  apellido = '';
  pais: string;
  tipoDocumento: string;
  numeroDocumento: number;
  genero: string;
  email: string;
}

@Component({
  selector: 'app-register-social',
  templateUrl: './register-social.component.html'
})
export class RegisterSocialComponent implements OnInit {

  model: Datos = new Datos;
  paises: Pais[] = [];
  tipoDocumentos: string[] = TipoDocumentos.build();
  generos: string[] = Generos.build();
  loading = false;
  captcha: string = null;
  complexForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private alertService: AlertService,
              private personaService: PersonaService,
              private metadataService: MetadataService) {

    this.complexForm = fb.group({
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
      'numeroDocumento': [null, Validators.required],
      'tipoDocumento': [null, Validators.required],
      'pais': [null, Validators.required],
      'genero': [null, Validators.required],
    });

  }

  ngOnInit(): void {
    this.metadataService.getPaises().then((data: any) => {
      this.paises = data;
    });

    this.model.tipoDocumento = this.tipoDocumentos[0];
    this.model.genero = this.generos[0];
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

  buildPersonaUser(data) {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
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

  savePersona(persona: Persona) {
    this.personaService.create(persona)
      .then(() => {
        this.router.navigate(['/login'])
          .then(() => {
            this.alertService.success('Registro Exitoso');
          });
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
