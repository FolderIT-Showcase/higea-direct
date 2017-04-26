import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PersonaService} from '../../../core/service/persona.service';
import {AlertService} from '../../../core/service/alert.service';
import {TipoDocumentoEnum, TipoDocumentoLabel, TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {Generos} from '../../../core/domain/enums/genero';
import {Pais} from '../../../core/domain/pais';
import {User} from '../../../core/domain/user';
import {Persona} from '../../../core/domain/persona';
import {Documento} from '../../../core/domain/documento';
import {StoreService} from '../../../core/service/store.service';

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

  model: Data = new Data;
  paises: Pais[] = [];
  tipoDocumentos: string[] = TipoDocumentos.build();
  generos: string[] = Generos.build();
  loading = false;
  captcha: string = null;

  constructor(private router: Router,
              private personaService: PersonaService,
              private alertService: AlertService,
              private storeService: StoreService) {

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

  public register(): void {

    // TODO: habilitar captcha

    // if (!this.captcha) {
    //   this.alertService.error('Por Favor complete todos los datos');
    //   return;
    // }

    if (this.model.pais.toLowerCase() !== 'argentina') {
      this.model.tipoDocumento = TipoDocumentoLabel.documentoExtranjero;
    }

    this.loading = true;
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

    if (persona.documento.tipo === TipoDocumentoEnum.dni) {
      this.personaService.validateDni(persona.documento.numero.toString(), persona.nombre, persona.apellido, persona.genero.slice(0, 1))
        .then(() => {
          this.save(persona);
        })
        .catch(error => {
          this.alertService.error(error);
          console.log(error);
        });
      return;
    }

    this.save(persona);

  }

  private save(persona: Persona): void {
    this.personaService.create(persona)
      .then(data => {
        this.router.navigate(['/login']);
        this.alertService.success('Registro Exitoso');
      })
      .catch(error => {
        this.alertService.error(error);
        this.loading = false;
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
