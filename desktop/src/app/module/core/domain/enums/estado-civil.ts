export class EstadosCiviles {
    static estadosCiviles = [{
        'id': 'CASADO',
        'label': 'Casado'
    }, {
        'id': 'DIVORCIADO',
        'label': 'Divorciado'
    }, {
        'id': 'SEPARADO',
        'label': 'Separado'
    }, {
        'id': 'SOLTERO',
        'label': 'Soltero'
    }, {
        'id': 'UNIDAD_DE_HECHO',
        'label': 'Unidad de Hecho'
    }, {
        'id': 'VIUDO',
        'label': 'Viudo'
    }];

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
