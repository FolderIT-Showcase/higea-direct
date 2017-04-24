import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {Generos} from '../../../core/domain/enums/genero';
import {Pais} from '../../../core/domain/pais';
import {Router} from '@angular/router';
import {Store} from '../../../core/service/store';
import {PersonaService} from '../../../core/service/persona.service';
import {AlertService} from '../../../core/service/alert.service';
import {User} from '../../../core/domain/user';
import {Persona} from '../../../core/domain/persona';
import {Documento} from '../../../core/domain/documento';

class Datos {
  pais: string;
  tipoDocumento: string;
  numeroDocumento: number;
  genero: string;
  username: string;
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
  tipoDocumentos: TipoDocumentos = new TipoDocumentos();
  generos: Generos = new Generos();
  loading = false;
  captcha: string = null;

  constructor(private router: Router,
              private userService: PersonaService,
              private alertService: AlertService,
              private store: Store) {

    const user: User = JSON.parse(localStorage.getItem('socialUser'));
    if (user) {
      this.model.email = user.email;
      this.model.username = user.username;
    }

  }

  ngOnInit(): void {
    this.store.changes.pluck('paises').first().toPromise()
      .then((data: any) => {
        this.paises = data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  register() {

    if (!this.captcha) {
      this.alertService.error('Por Favor complete todos los datos');
      return;
    }

    this.loading = true;
    const user: User = new User();
    user.username = this.model.username;
    const persona: Persona = new Persona();
    persona.genero = this.model.genero;
    persona.documento = new Documento();
    persona.documento.tipoDocumento = this.model.tipoDocumento;
    persona.documento.numero = this.model.numeroDocumento;
    user.email = this.model.email;
    persona.userAsociado = user;

    this.userService.create(persona)
      .then(data => {
        this.alertService.success('Registro Exitoso');
        this.router.navigate(['/login']);
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

  }

}
