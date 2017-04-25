export class TipoDocumentoLabel {
  static dni = 'dni';
  static pasaporte = 'pasaporte';
  static cedulaIdentidad = 'Cedula de Identidad';
  static libretaEnrolamiento = 'Libreta de Enrolamiento';
  static libretaCivica = 'Libreta Cívica';
  static documentoExtranjero = 'Documento Extranjero';
}

export class TipoDocumentoEnum {
  static dni = 'dni';
  static pasaporte = 'pasaporte';
  static cedulaIdentidad = 'cedulaIdentidad';
  static libretaEnrolamiento = 'libretaEnrolamiento';
  static libretaCivica = 'libretaCivica';
  static documentoExtranjero = 'documentoExtranjero';
}

export class TipoDocumentos {
  static build() {
    const tipoDocumentos: string[] = [];
    tipoDocumentos.push(TipoDocumentoLabel.dni);
    tipoDocumentos.push(TipoDocumentoLabel.pasaporte);
    tipoDocumentos.push(TipoDocumentoLabel.cedulaIdentidad);
    tipoDocumentos.push(TipoDocumentoLabel.libretaEnrolamiento);
    tipoDocumentos.push(TipoDocumentoLabel.libretaCivica);
    tipoDocumentos.push(TipoDocumentoLabel.documentoExtranjero);
    return tipoDocumentos;
  }

}
