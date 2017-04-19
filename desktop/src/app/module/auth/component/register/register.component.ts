import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../core/service/user.service';
import {AlertService} from '../../../core/service/alert.service';
import {TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {Generos} from '../../../core/domain/enums/genero';
import {Pais} from '../../../core/domain/pais';
import {User} from '../../../core/domain/user';
import {Store} from '../../../core/service/store';

class Datos {
  pais: string;
  tipoDocumento: string;
  numeroDocumento: number;
  genero: string;
  fechaNacimiento: string;
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
  generos: Generos = new Generos();
  loading = false;

  constructor(private router: Router,
              private userService: UserService,
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
  }

  register() {
    this.loading = true;
    const user: User = new User();
    // TODO: setear datos como corresponde

    this.userService.create(user)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
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

}
