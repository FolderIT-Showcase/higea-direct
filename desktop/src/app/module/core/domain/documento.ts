export class Documento {
  id?: number;
  tipo: string;
  numero: number;

  constructor(mTipo, mNumero) {
    this.tipo = mTipo;
    this.numero = mNumero;
  }

}
