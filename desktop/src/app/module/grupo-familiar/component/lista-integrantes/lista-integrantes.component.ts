import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {AlertService} from '../../../core/service/alert.service';
import {Persona} from '../../../core/domain/persona';
import {Documento} from '../../../core/domain/documento';
import {Domicilio} from '../../../core/domain/domicilio';
import {EstadosCiviles} from '../../../core/domain/enums/estado-civil';
import {Generos} from '../../../core/domain/enums/genero';
import {TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {Nacionalidades} from '../../../core/domain/enums/nacionalidad';
import {Paises} from '../../../core/domain/enums/paises';
import {ApiService} from '../../../core/service/api.service';
import _ from 'lodash';

@Component({
    selector: 'app-lista-integrantes',
    templateUrl: './lista-integrantes.component.html',
    styleUrls: ['./lista-integrantes.component.scss']
})
export class ListaIntegrantesComponent {
    @ViewChild('autoShownModal') public autoShownModal: ModalDirective;

     private integranteSelected = null;
     private selectUndefined: any;
     private currentUser = JSON.parse(localStorage.getItem('currentUser'));

     public isModalShown = false;
     public modalAction = 'none';
     public formData = {};
     public lists = {
         'generos': Generos.build(),
         'documentoTipos': TipoDocumentos.build(),
         'estadosCiviles': EstadosCiviles.build(),
         'nacionalidades': Nacionalidades.build(),
         'paises': [],
         'provincias': [],
         'partidos': [],
         'localidades': []
     };
     public integrantes: Persona[] = [];

     public rebuildLists(integrante) {
         this.lists.provincias = [];
         this.lists.partidos = [];
         this.lists.localidades = [];
         // Busqueda de pais
         if (!integrante || !integrante.domicilio || !integrante.domicilio.pais) {
             return;
         }
         const pais = Paises.paises.find((e) => {
             return e.nombre === integrante.domicilio.pais.nombre;
         });
         if (!pais) {
             integrante.domicilio.pais = {
                 'nombre': this.selectUndefined,
                 'provincia': {
                     'nombre': this.selectUndefined,
                     'partido': {
                         'nombre': this.selectUndefined,
                         'localidad': {
                             'nombre': this.selectUndefined
                         }
                     }
                 }
             };
             return;
         }
         // Busqueda de provincias
         const provincias = pais.provincias;
         this.lists.provincias = provincias.map((e) => {
             return e.nombre;
         });
         this.lists.provincias.sort();
         if (!integrante.domicilio.pais.provincia) {
             return;
         }
         const provincia = provincias.find((e) => {
             return e.nombre === integrante.domicilio.pais.provincia.nombre;
         });
         if (!provincia) {
             integrante.domicilio.pais.provincia = {
                 'nombre': this.selectUndefined,
                 'partido': {
                     'nombre': this.selectUndefined,
                     'localidad': {
                         'nombre': this.selectUndefined
                     }
                 }
             };
             return;
         }
         // Busqueda de partidos
         const partidos = provincia.partidos;
         this.lists.partidos = partidos.map((e) => {
             return e.nombre;
         });
         this.lists.partidos.sort();
         if (!integrante.domicilio.pais.provincia.partido) {
             return;
         }
         const partido = partidos.find((e) => {
             return e.nombre === integrante.domicilio.pais.provincia.partido.nombre;
         });
         if (!partido) {
             integrante.domicilio.pais.provincia.partido = {
                 'nombre': this.selectUndefined,
                 'localidad': {
                     'nombre': this.selectUndefined
                 }
             };
             return;
         }
         // Busqueda de localidades
         const localidades = partido.localidades;
         this.lists.localidades = localidades.map((e) => {
             return e.nombre;
         });
         this.lists.localidades.sort();
         const localidad = localidades.find((e) => {
             return e.nombre === integrante.domicilio.pais.provincia.partido.localidad.nombre;
         });
         if (!localidad) {
             integrante.domicilio.pais.provincia.partido.localidad = {
                 'nombre': this.selectUndefined
             };
             return;
         }
     }

     public showModal(action, integrante) {
         this.isModalShown = true;
         this.modalAction = action;
         this.integranteSelected = integrante;

         this.rebuildLists(integrante);

         if (['edit', 'view', 'delete'].indexOf(action) >= 0) {
             this.formData = Object.assign({}, this.integranteSelected);
         }

         if (['add'].indexOf(action) >= 0) {
             this.formData = Object.assign({}, new Persona());
             console.log(this.formData);
         }
     }

     public hideModal(action) {
         this.autoShownModal.hide();
     }

     public onHidden(action) {
         this.isModalShown = false;
     }

     public confirmModal(action, integrante) {
         this.autoShownModal.hide();

         if (action === 'delete') {
             const i = _.findIndex(this.integrantes, integrante);
             if (i >= 0) {
                 this.integrantes.splice(i, 1);
             }
             this.alertService.success('Integrante removido correctamente.');
         }

         if (action === 'add') {
             this.integrantes.push(integrante);
             this.alertService.success('Integrante agregado correctamente.');
         }

         if (action === 'edit') {
             Object.assign(this.integranteSelected, this.formData);
             this.alertService.success('Integrante editado correctamente.');
         }
     }

     constructor(private alertService: AlertService,
                 private api: ApiService) {
         // Popular listas
         this.lists.paises = Paises.build();

//         this.api.get('persona/email?email=' + this.currentUser.email).first().toPromise()
//             .then((algo) => {
//             console.log(algo);
//         }, (error) => {
//             console.log(error);
//         });

         // Pushear datos de prueba
         this.integrantes.push({
             'principal': true,
             'nombre': 'Luis',
             'genero': 'Masculino',
             'apellido': 'Bonsembiante',
             'fechaNacimiento': new Date('1982-09-13'),
             'documento': {
                 'tipo': 'DNI',
                 'numero': 296118961
             },
             'estadoCivil': 'Casado',
             'nacionalidad': 'Argentina',
             'telefono': '(0342) 4456789',
             'domicilio': {
                 'pais': {
                     'nombre': 'Argentina',
                     'provincia': {
                         'nombre': 'Santa Fe',
                         'partido': {
                             'nombre': 'Otro',
                             'localidad': {
                                 'nombre': 'Otra'
                             }
                         }
                     }
                 }
             }
         });

         this.integrantes.push({
             'principal': false,
             'nombre': 'Ignacio',
             'genero': 'Masculino',
             'apellido': 'Bonsembiante',
             'fechaNacimiento': new Date('2013-02-21'),
             'documento': {
                 'tipo': 'DNI',
                 'numero': 521456369
             },
             'estadoCivil': 'Soltero',
             'nacionalidad': 'Argentina',
             'telefono': '(0342) 4456789',
             'domicilio': {
                 'pais': {
                     'nombre': 'Argentina',
                     'provincia': {
                         'nombre': 'Santa Fe',
                         'partido': {
                             'nombre': 'Otro',
                             'localidad': {
                                 'nombre': 'Otra'
                             }
                         }
                     }
                 }
             }
         });

         // Reordenar las listas para permitir una edición rápida
         for (const list in this.lists) {
             if (!this.lists.hasOwnProperty(list)) {
                 continue;
             }

             if (Array.isArray(this.lists[list])) {
                 this.lists[list].sort();
             }
         }
     }
    }
