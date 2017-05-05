export class TipoDocumentos {
  static tipoDocumentos = [{
    'id': 'dni',
    'label': 'DNI'
  }, {
    'id': 'pasaporte',
    'label': 'PAS'
  }, {
    'id': 'cedulaIdentidad',
    'label': 'CI'
  }, {
    'id': 'libretaEnrolamiento',
    'label': 'LE'
  }, {
    'id': 'libretaCivica',
    'label': 'LC'
  }, {
    'id': 'documentoExtranjero',
    'label': 'Documento Extranjero'
  }];

  static build() {
    const tipoDocumentos = TipoDocumentos.tipoDocumentos.map((e) => {
      return e.label;
    });
    tipoDocumentos.sort();
    return tipoDocumentos;
  }

  static export() {
    const tipoDocumentos = TipoDocumentos.tipoDocumentos;
    tipoDocumentos.sort((a, b) => {
      return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0);
    });
    return tipoDocumentos;
  }
}

