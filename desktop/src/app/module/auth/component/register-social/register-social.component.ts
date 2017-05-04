import {Component, OnInit} from '@angular/core';
import {TipoDocumentoEnum, TipoDocumentoLabel, TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {Generos} from '../../../core/domain/enums/genero';
import {Pais} from '../../../core/domain/pais';
import {Router} from '@angular/router';
import {PersonaService} from '../../../core/service/persona.service';
import {AlertService} from '../../../core/service/alert.service';
import {User} from '../../../core/domain/user';
import {Persona} from '../../../core/domain/persona';
import {Documento} from '../../../core/domain/documento';
import {StoreService} from '../../../core/service/store.service';
import {LoadingService} from '../../../core/service/loading.service';

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
  templateUrl: './register-social.component.html',
  styleUrls: ['./register-social.component.scss']
})
export class RegisterSocialComponent implements OnInit {

  model: Datos = new Datos;
  paises: Pais[] = [];
  tipoDocumentos: string[] = TipoDocumentos.build();
  generos: string[] = Generos.build();
  loading = false;
  captcha: string = null;

  constructor(private router: Router,
              private loadingService: LoadingService,
              private alertService: AlertService,
              private personaService: PersonaService,
              private storeService: StoreService) {

    const user: User = JSON.parse(localStorage.getItem('socialUser'));
    if (user) {
      this.model.email = user.email;
    }

  }

  ngOnInit(): void {
    this.paises = this.storeService.get('paises');
    this.model.tipoDocumento = this.tipoDocumentos[0];
    this.model.genero = this.generos[0];
    this.model.pais = this.paises[11].nombre;
  }

  public register(): void {

    // if (!this.captcha) {
    //   this.alertService.error('Por Favor complete todos los datos');
    //   return;
    // }

    if (this.model.pais.toLowerCase() !== 'argentina') {
      this.model.tipoDocumento = TipoDocumentoLabel.documentoExtranjero;
    }

    this.loading = true;
    const user: User = new User();
    const persona: Persona = new Persona();
    persona.nombre = this.model.nombre;
    persona.apellido = this.model.apellido;
    persona.genero = this.model.genero;
    persona.documento = new Documento();
    persona.documento.tipo = PersonaService.convertTipoDocumento(this.model.tipoDocumento);
    persona.documento.numero = this.model.numeroDocumento;
    user.email = this.model.email;
    persona.userAsociado = user;

    if (persona.documento.tipo === TipoDocumentoEnum.dni) {

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
            this.alertService.success('Registro Exitoso');
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
  }

}
