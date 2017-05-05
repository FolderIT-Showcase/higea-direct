export class TipoContactos {
  static tipoContactos = [{
    'id': 'telefono',
    'label': 'Teléfono'
  }, {
    'id': 'mail',
    'label': 'Email'
  }, {
    'id': 'celular',
    'label': 'Celular'
  }];

  static build() {
    const tipoContactos = TipoContactos.tipoContactos.map((e) => {
      return e.label;
    });
    tipoContactos.sort();
    return tipoContactos;
  }

  static export() {
    const tipoContactos = TipoContactos.tipoContactos;
    tipoContactos.sort((a, b) => {
      return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0);
    });
    return tipoContactos;
  }
}
