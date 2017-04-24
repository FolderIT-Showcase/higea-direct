import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PersonaService} from '../../../core/service/persona.service';
import {AlertService} from '../../../core/service/alert.service';
import {TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {Generos} from '../../../core/domain/enums/genero';
import {Pais} from '../../../core/domain/pais';
import {User} from '../../../core/domain/user';
import {Store} from '../../../core/service/store';
import {Persona} from '../../../core/domain/persona';
import {Documento} from '../../../core/domain/documento';
import {StoreService} from '../../../core/service/store.service';
import {MetadataService} from '../../../core/service/metadata.service';

class Datos {
  pais = '';
  tipoDocumento = '';
  numeroDocumento: number;
  genero = '';
  username = '';
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

  model: Datos = new Datos;
  paises: Pais[] = [];
  tipoDocumentos: TipoDocumentos = new TipoDocumentos();
  generos: String[] = Generos.build();
  loading = false;
  captcha: string = null;

  constructor(private router: Router,
              private personaService: PersonaService,
              private alertService: AlertService,
              private store: Store,
              private storeService: StoreService,
              private metadataService: MetadataService) {

  }

  ngOnInit(): void {
    this.metadataService.getPaises().first().toPromise();
    this.paises = this.storeService.get('paises');
    this.model.tipoDocumento = this.tipoDocumentos[0].toLowerCase();
    this.model.genero = this.generos[0].toLowerCase();
    this.model.pais = this.paises[0].nombre;
  }

  ngOnDestroy(): void {
    this.captcha = null;
  }

  register() {

    // if (!this.captcha) {
    //   this.alertService.error('Por Favor complete todos los datos');
    //   return;
    // }

    this.loading = true;
    const user: User = new User();
    user.username = this.model.username;
    user.password = this.model.password1;
    const persona: Persona = new Persona();
    persona.genero = this.model.genero.toUpperCase();
    persona.documento = new Documento();
    persona.documento.tipoDocumento = this.model.tipoDocumento;
    persona.documento.numero = this.model.numeroDocumento;
    user.email = this.model.email;
    persona.userAsociado = user;

    this.personaService.create(persona)
      .then(data => {
        this.router.navigate(['/login']);
        setTimeout(() => {
          this.alertService.success('Registro Exitoso');
        }, 500);
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
