export class GeneroLabel {
  static masculino = 'Masculino';
  static femenino = 'Femenino';
  static otro = 'Otro';
}

export class GeneroEnum {
  static masculino = 'MASCULINO';
  static femenino = 'FEMENINO';
  static otro = 'OTROS';
}

export class Generos {

  static generos = [{
    'id': 'MASCULINO',
    'label': 'MASCULINO'
  }, {
    'id': 'FEMENINO',
    'label': 'FEMENINO'
  }, {
    'id': 'OTROS',
    'label': 'OTROS'
  }];

  static build() {
    const generos: string[] = [];
    generos.push(GeneroLabel.femenino);
    generos.push(GeneroLabel.masculino);
    generos.push(GeneroLabel.otro);
    generos.sort();
    return generos;
  }

  static export() {
    const generos = Generos.generos;
    generos.sort((a, b) => {
      return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0);
    });
    return generos;
  }
}
