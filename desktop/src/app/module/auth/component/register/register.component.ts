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

class Datos {
  pais: string;
  tipoDocumento: string;
  numeroDocumento: number;
  genero: string;
  username: string;
  password1: string;
  password2: string;
  email: string;
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
              private userService: PersonaService,
              private alertService: AlertService,
              private store: Store) {
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

  ngOnDestroy(): void {
    this.captcha = null;
  }

  register() {

    if (!this.captcha) {
      this.alertService.error('Por Favor complete todos los datos');
      return;
    }

    this.loading = true;
    const user: User = new User();
    user.username = this.model.username;
    user.password = this.model.password1;
    const persona: Persona = new Persona();
    persona.genero = this.model.genero.toLowerCase();
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
    this.captcha = event;
  }

}
