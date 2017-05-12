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

  constructor(private router: Router,
              private alertService: AlertService,
              private personaService: PersonaService,
              private metadataService: MetadataService) {

    const user: User = JSON.parse(localStorage.getItem('socialUser'));
    if (user) {
      this.model.email = user.email;
    }

  }

  ngOnInit(): void {
    this.metadataService.getPaises().then(data => this.paises);
    this.model.pais = this.paises[11].nombre;
    this.model.tipoDocumento = this.tipoDocumentos[0];
    this.model.genero = this.generos[0];
  }

  public register(): void {

    // if (!this.captcha) {
    //   this.alertService.error('Por Favor complete todos los datos');
    //   return;
    // }

    if (this.model.pais.toLowerCase() !== 'argentina') {
      this.model.tipoDocumento = 'Documento Extranjero';
    }

    this.loading = true;
    const user: User = new User();
    const persona: Persona = new Persona();
    persona.nombre = this.model.nombre;
    persona.apellido = this.model.apellido;
    persona.genero = this.model.genero;
    persona.documento = new Documento();
    persona.documento.id = null;
    persona.documento.numero = this.model.numeroDocumento;
    persona.documento.tipoDocumento = TipoDocumentos.findByLabel(this.model.tipoDocumento);
    user.email = this.model.email;
    persona.userAsociado = user;

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
        })
        .catch(error => {
          console.error(error);
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
  }

}
