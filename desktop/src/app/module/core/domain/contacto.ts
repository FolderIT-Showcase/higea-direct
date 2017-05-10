export class Contacto {
  id?: number;
  tipoContacto: string;
  dato: string;

  constructor(mTipoContacto, mDato) {
    this.tipoContacto = mTipoContacto;
    this.dato = mDato;
  }
}
