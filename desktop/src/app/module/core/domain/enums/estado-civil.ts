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
        return estadosCiviles;
    }
}
