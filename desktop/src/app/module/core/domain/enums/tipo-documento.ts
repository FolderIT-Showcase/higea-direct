export class TipoDocumento {
  dni = 'Documento Nacional de Identidad';
  pasaporte = 'Pasaporte';
  cedulaIdentidad = 'Cedula de Identidad';
  libretaEnrolamiento = 'Libreta de Enrolamiento';
  libretaCivica = 'Libreta Cívica';
  documentoExtranjero = 'Documento Extranjero';
}

export class TipoDocumentos {
  constructor() {
    const tipoDocumento = new TipoDocumento();
    const tipoDocumentos: String[] = [];
    tipoDocumentos.push(tipoDocumento.dni);
    tipoDocumentos.push(tipoDocumento.pasaporte);
    tipoDocumentos.push(tipoDocumento.cedulaIdentidad);
    tipoDocumentos.push(tipoDocumento.libretaEnrolamiento);
    tipoDocumentos.push(tipoDocumento.libretaCivica);
    tipoDocumentos.push(tipoDocumento.documentoExtranjero);
    return tipoDocumentos;
  }
}
