export class TipoDocumentoLabel {
    static dni = 'DNI';
    static pasaporte = 'PAS';
    static cedulaIdentidad = 'CI';
    static libretaEnrolamiento = 'LE';
    static libretaCivica = 'LC';
    static documentoExtranjero = 'Documento Extranjero';
}

export class TipoDocumentoEnum {
    static dni = 'dni';
    static pasaporte = 'pasaporte';
    static cedulaIdentidad = 'cedulaIdentidad';
    static libretaEnrolamiento = 'libretaEnrolamiento';
    static libretaCivica = 'libretaCivica';
    static documentoExtranjero = 'documentoExtranjero';
}

export class TipoDocumentos {
    static build() {
        const tipoDocumentos: string[] = [];
        tipoDocumentos.push(TipoDocumentoLabel.dni);
        tipoDocumentos.push(TipoDocumentoLabel.pasaporte);
        tipoDocumentos.push(TipoDocumentoLabel.cedulaIdentidad);
        tipoDocumentos.push(TipoDocumentoLabel.libretaEnrolamiento);
        tipoDocumentos.push(TipoDocumentoLabel.libretaCivica);
        tipoDocumentos.push(TipoDocumentoLabel.documentoExtranjero);
        tipoDocumentos.sort();
        return tipoDocumentos;
    }

    static export() {
        const tipoDocumentos: Object[] = [];
        for (const e in TipoDocumentoEnum) {
            if (!TipoDocumentoEnum.hasOwnProperty(e)) {
                continue;
            }
            tipoDocumentos.push({
                'id': TipoDocumentoEnum[e],
                'label': TipoDocumentoLabel[e]
            });
        }
        return tipoDocumentos;
    }

    static labels() {
        return {
            'dni': 'DNI',
            'pasaporte': 'PAS',
            'cedulaIdentidad': 'CI',
            'libretaEnrolamiento': 'LE',
            'libretaCivica': 'LC',
            'documentoExtranjero': 'Documento Extranjero'
        };
    }
}
