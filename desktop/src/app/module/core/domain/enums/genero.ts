export class Genero {
  masculino = 'Masculino';
  femenino = 'Femenino';
  otro = 'Otro';
}

export class Generos {
  static build() {
    const genero = new Genero();
    const generos: String[] = [];
    generos.push(genero.masculino);
    generos.push(genero.femenino);
    generos.push(genero.otro);
    return generos;
  }
}
