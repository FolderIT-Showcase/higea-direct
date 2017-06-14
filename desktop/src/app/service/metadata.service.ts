import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Pais} from '../domain/pais';
import {Provincia} from '../domain/provincia';
import {Localidad} from '../domain/localidad';
import {Store} from './store';
import {ObraSocial} from '../domain/obra-social';
import {TipoTurno} from '../domain/tipo-turno';
import {EstadosCiviles} from '../domain/enums/estado-civil';
import {Especialidad} from '../domain/especialidad';
import {Profesional} from '../domain/profesional';
import {MotivoTurno} from '../domain/motivo-turno';

@Injectable()
export class MetadataService {

  paises: Pais[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  obras_sociales: ObraSocial[] = [];
  tipos_turnos: TipoTurno[] = [];
  estados_civil: EstadosCiviles[] = [];
  motivos: MotivoTurno[] = [];
  license = localStorage.getItem('license');
  client = localStorage.getItem('client');
  // basePath = `${this.license}/${this.client}/`;
  basePath = 'core/';

  constructor(private api: ApiService,
              private store: Store) {

    if (this.license === 'core') {
      this.basePath = this.license + '/';
    }

  }

  async getPaises() {
    let list = await this.store.get('paises');
    if (!list) {
      list = await this.requestPaises();
      this.setPaises(list);
    }
    return list;
  }

  requestPaises() {
    const path = this.basePath + 'pais';
    return this.api.get(path, false);
  }

  setPaises(mPaises) {
    this.paises = mPaises.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('paises', this.paises);
  }

  async getProvincias() {
    let list = await this.store.get('provincias');
    if (!list) {
      list = await this.requestProvincias();
      this.setProvincias(list);
    }
    return list;
  }

  requestProvincias() {
    const path = this.basePath + 'provincia';
    return this.api.get(path);
  }

  setProvincias(mProvincias) {
    this.provincias = mProvincias.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('provincias', this.provincias);
  }

  async getLocalidades(): Promise<any> {
    let list = await this.store.get('localidades');
    if (!list) {
      list = await this.requestLocalidades();
      this.setLocalidades(list);
    }
    return list;
  }

  requestLocalidades() {
    const path = this.basePath + 'localidad';
    return this.api.get(path);
  }

  setLocalidades(mLocalidades) {
    this.localidades = mLocalidades.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('localidades', this.localidades);
  }

  uriRegistration = this.basePath + 'users/registration';

  async getObrasSociales() {
    let list = await this.store.get('obras_sociales');
    if (!list) {
      list = await this.requestObrasSociales();
      this.setObrasSociales(list);
    }
    return list;
  }

  requestObrasSociales() {
    const path = this.basePath + 'obraSocial';
    return this.api.get(path, false);
  }

  setObrasSociales(mOS) {
    this.obras_sociales = mOS.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('obras_sociales', this.obras_sociales);
  }

  async getAllTiposTurnos(): Promise<any> {
    let list = await this.store.get('tipos_turnos');
    if (!list) {
      list = await this.requestTiposTurnos();
      this.setTipoTurnos(list);
    }
    return list;
  }

  requestTiposTurnos() {
    const path = this.basePath + 'tipoTurno';
    return this.api.get(path);
  }

  setTipoTurnos(mTT) {
    this.tipos_turnos = mTT.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('tipos_turnos', this.tipos_turnos);
  }

  async getAllEstadoCiviles(): Promise<any> {
    let list = await this.store.get('estado_civil');
    if (!list) {
      list = await this.requestEstadoCivil();
      this.setEstadoCivil(list);
    }
    return list;
  }

  requestEstadoCivil() {
    const path = this.basePath + 'estadoCivil';
    return this.api.get(path);
  }

  setEstadoCivil(estado) {
    this.estados_civil = estado.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('estado_civil', this.estados_civil);
  }

  async getEspecialidades(): Promise<any> {
    let list = await this.store.get('especialidades');
    if (!list) {
      list = await this.requestEspecialidades();
      this.setEspecialidades(list);
    }
    return list;
  }

  requestEspecialidades() {
    const path = this.basePath + 'especialidad';
    return this.api.get(path);
  }

  setEspecialidades(especialidades) {
    this.especialidades = especialidades.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('especialidades', this.especialidades);
  }

  async getProfesionales(): Promise<any> {
    let list = await this.store.get('profesionales');
    if (!list) {
      list = await this.requestProfesionales();
      this.setProfesionales(list);
    }
    return list;
  }

  requestProfesionales() {
    const path = this.basePath + 'profesional';
    return this.api.get(path);
  }

  setProfesionales(especialidades) {
    this.especialidades = especialidades.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('profesionales', this.especialidades);
  }

  async getMotivosTurno(): Promise<any> {
    let list = await this.store.get('motivos');
    if (!list) {
      list = await this.requestMotivosTurno();
      this.setMotivosTurno(list);
    }
    return list;
  }

  requestMotivosTurno() {
    const path = this.basePath + 'motivoTurno';
    return this.api.get(path);
  }

  setMotivosTurno(motivos) {
    this.motivos = motivos.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('motivos', this.motivos);
  }

}
