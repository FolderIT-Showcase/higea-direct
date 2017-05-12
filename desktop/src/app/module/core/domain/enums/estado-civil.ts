export class EstadosCiviles {
  static estadosCiviles  = [{
    'id': 'Casado',
    'label': 'Casado'
  }, {
    'id': 'Divorciado',
    'label': 'Divorciado'
  }, {
    'id': 'Separado',
    'label': 'Separado'
  }, {
    'id': 'Soltero',
    'label': 'Soltero'
  }, {
    'id': 'Unidad_de_Hecho',
    'label': 'Unidad de Hecho'
  }, {
    'id': 'Viudo',
    'label': 'Viudo'
  }];

  static findIDByLabel(label) {
    const estadosCiviles = EstadosCiviles.estadosCiviles;
    let id = '';
    for (const x of estadosCiviles) {
      if (x.label === label) {
        id = x.id;
        break;
      }
    }
    return id;
  }

  static build() {
    const estadosCiviles = EstadosCiviles.estadosCiviles.map((e) => {
      return e.label;
    });
    estadosCiviles.sort();
    return estadosCiviles;
  }

  static export() {
    const estadosCiviles = EstadosCiviles.estadosCiviles;
    estadosCiviles.sort((a, b) => {
      return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0);
    });
    return estadosCiviles;
  }
}
