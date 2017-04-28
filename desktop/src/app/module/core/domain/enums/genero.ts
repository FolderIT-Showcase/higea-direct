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
        const generos: {'id': string, 'label': string}[] = [];
        for (const e in GeneroEnum) {
            if (!GeneroEnum.hasOwnProperty(e)) {
                continue;
            }
            generos.push({
                'id': GeneroEnum[e],
                'label': GeneroLabel[e]
            });
        }
        generos.sort((a, b) => {
            return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0);
        });
        return generos;
    }
}
