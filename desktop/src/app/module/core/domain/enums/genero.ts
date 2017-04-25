export class GeneroLabel {
  static masculino = 'Masculino';
  static femenino = 'Femenino';
  static otro = 'Otro';
}

export class GeneroEnum {
  static masculino = 'masculino';
  static femenino = 'femenino';
  static otro = 'otro';
}

export class Generos {
  static build() {
    const generos: string[] = [];
    generos.push(GeneroLabel.masculino);
    generos.push(GeneroLabel.femenino);
    generos.push(GeneroLabel.otro);
    return generos;
  }
}
