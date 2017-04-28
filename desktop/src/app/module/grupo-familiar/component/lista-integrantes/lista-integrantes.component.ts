import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {AlertService} from '../../../core/service/alert.service';
import {Persona} from '../../../core/domain/persona';
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
     private currentPersona = new Persona();

     public isModalShown = false;
     public modalAction = 'none';
     public formData = {};
     public lists = {
         'generos': Generos.export(),
         'tipoDocumentos': TipoDocumentos.export(),
         'estadosCiviles': EstadosCiviles.export(),
         'nacionalidades': Nacionalidades.export(),
         'paises': [],
         'provincias': [],
         'partidos': [],
         'localidades': []
     };
     public labels = {
         'tipoDocumentos': function(e) {
             return TipoDocumentos.labels()[e];
         }
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
             this.formData = _.merge({}, this.integranteSelected);
         }

         if (['add'].indexOf(action) >= 0) {
             this.formData = _.merge({}, new Persona());
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
             const prevPersona = _.merge({}, this.currentPersona);
             const i = _.findIndex(this.currentPersona.integrantes, integrante);
             if (i >= 0) {
                 this.currentPersona.integrantes.splice(i, 1);
             }
             const path = 'persona';
             this.api.post(path, this.currentPersona).first().toPromise().then((res) => {
                 this.alertService.success('Integrante removido correctamente.');
             }, (error) => {
                 this.currentPersona = _.merge({}, prevPersona);
                 this.alertService.error('Ocurrió un error al intentar remover al integrante..');
             });
         }

         if (action === 'add') {
             const prevPersona = _.merge({}, this.currentPersona);
             this.currentPersona.integrantes.push(integrante);
             const path = 'persona';
             this.api.post(path, this.currentPersona).first().toPromise().then((res) => {
                 this.alertService.success('Integrante agregado correctamente.');
             }, (error) => {
                 this.currentPersona = _.merge({}, prevPersona);
                 this.alertService.error('Ocurrió un error al intentar agregar al integrante..');
             });
         }

         if (action === 'edit') {
             const prevPersona = _.merge({}, this.currentPersona);
             _.merge(this.integranteSelected, this.formData);
             const path = 'persona';
             this.api.post(path, this.currentPersona).first().toPromise().then((res) => {
                 this.alertService.success('Integrante editado correctamente.');
             }, (error) => {
                 this.currentPersona = _.merge({}, prevPersona);
                 this.alertService.error('Ocurrió un error al intentar editar al integrante..');
             });
         }
     }

     constructor(private alertService: AlertService,
                 private api: ApiService) {
         // Popular listas
         this.lists.paises = Paises.build();
         const path = 'persona/email?email=' + this.currentUser.email;
         this.api.get(path).first().toPromise()
             .then((res) => {
             if (res) {
                 this.currentPersona = _.merge(new Persona(), res);
                 this.currentPersona.integrantes = [];
                 console.log('res', res);
                 console.log('currentPersona', this.currentPersona);
                 _.forEach(res.integrantes, (e) => {
                     const i = _.merge(new Persona(), e);
                     this.currentPersona.integrantes.push(i);
                 });
             }
         }, (error) => {
             this.alertService.error('Error de conexión a la API');
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
