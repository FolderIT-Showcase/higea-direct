export class Paises {
    static paises = [{
        'nombre': 'Argentina',
        'provincias': [{
            'nombre': 'Chaco',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Chubut',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Tierra del Fuego',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Buenos Aires',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Santa Fe',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Catamarca',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Jujuy',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Corrientes',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Córdoba',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Neuquén',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Santa Cruz',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Entre Ríos',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Santiago del Estero',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'La Pampa',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Río Negro',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Mendoza',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'San Luis',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'La Rioja',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'San Juan',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Tucumán',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Salta',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Formosa',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Misiones',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }, {
            'nombre': 'Islas del Atlántico Sur',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }]
    }, {
        'nombre': 'Chile',
        'provincias': [{
            'nombre': 'Otra',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }]
    }, {
        'nombre': 'Brasil',
        'provincias': [{
            'nombre': 'Otra',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }]
    }, {
        'nombre': 'Uruguay',
        'provincias': [{
            'nombre': 'Otra',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }]
    }, {
        'nombre': 'Paraguay',
        'provincias': [{
            'nombre': 'Otra',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }]
    }, {
        'nombre': 'Bolivia',
        'provincias': [{
            'nombre': 'Otra',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }]
    }, {
        'nombre': 'Perú',
        'provincias': [{
            'nombre': 'Otra',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }]
    }, {
        'nombre': 'Colombia',
        'provincias': [{
            'nombre': 'Otra',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }]
    }, {
        'nombre': 'Ecuador',
        'provincias': [{
            'nombre': 'Otra',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }]
    }, {
        'nombre': 'Guyana',
        'provincias': [{
            'nombre': 'Otra',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }]
    }, {
        'nombre': 'Surinam',
        'provincias': [{
            'nombre': 'Otra',
            'localidades': [{
                'nombre': 'Otra'
            }]
        }]
    }];

static build() {
    const paises = Paises.paises.map((e) => {
        return e.nombre;
    });
    paises.sort();
    return paises;
}

static export() {
    const paises = Paises.paises;
    paises.sort((a, b) => {
        return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    return paises;
}
}
