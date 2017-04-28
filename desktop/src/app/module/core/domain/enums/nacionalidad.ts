export class Nacionalidades {
    static nacionalidades = [{
        'id': 'CHILENA',
        'label': 'Chilena'
    }, {
        'id': 'ARGENTINA',
        'label': 'Argentina'
    }, {
        'id': 'BRASILEÑA',
        'label': 'Brasileña'
    }, {
        'id': 'URUGUAYA',
        'label': 'Uruguaya'
    }, {
        'id': 'PARAGUAYA',
        'label': 'Paraguaya'
    }, {
        'id': 'BOLIVIANA',
        'label': 'Boliviana'
    }, {
        'id': 'Surinamesa',
        'label': 'Surinamesa'
    }, {
        'id': 'VENEZOLANA',
        'label': 'Venezolana'
    }, {
        'id': 'GUYANES',
        'label': 'Guyanés'
    }, {
        'id': 'ECUATORIANA',
        'label': 'Ecuatoriana'
    }, {
        'id': 'COLOMBIANA',
        'label': 'Colombiana'
    }, {
        'id': 'PERUANA',
        'label': 'Peruana'
    }];

    static build() {
        const nacionalidades = Nacionalidades.nacionalidades.map((e) => {
            return e.label;
        });
        nacionalidades.sort();
        return nacionalidades;
    }

    static export() {
        const nacionalidades = Nacionalidades.nacionalidades;
        return nacionalidades;
    }
}
