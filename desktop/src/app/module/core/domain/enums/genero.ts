export class GeneroLabel {
    static masculino = 'Masculino';
    static femenino = 'Femenino';
    static otro = 'Otro';
}

export class GeneroEnum {
    static masculino = 'MASCULINO';
    static femenino = 'FEMENINO';
    static otro = 'OTRO';
}

export class Generos {
    static build() {
        const generos: string[] = [];
        generos.push(GeneroLabel.masculino);
        generos.push(GeneroLabel.femenino);
        generos.push(GeneroLabel.otro);
        generos.sort();
        return generos;
    }

    static export() {
        const generos: Object[] = [];
        for (const e in GeneroEnum) {
            if (!GeneroEnum.hasOwnProperty(e)) {
                continue;
            }
            generos.push({
                'id': GeneroEnum[e],
                'label': GeneroLabel[e]
            });
        }
        return generos;
    }
}
