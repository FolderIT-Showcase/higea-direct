import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {AlertService} from '../../../core/service/alert.service';
import {Persona} from '../../../core/domain/persona';
import {EstadosCiviles} from '../../../core/domain/enums/estado-civil';
import {Generos} from '../../../core/domain/enums/genero';
import {TipoDocumentos} from '../../../core/domain/enums/tipo-documento';
import {Paises} from '../../../core/domain/enums/paises';
import {TipoContactos} from '../../../core/domain/enums/tipo-contacto';
import {ApiService} from '../../../core/service/api.service';
import _ from 'lodash';
import {MetadataService} from "../../../core/service/metadata.service";
import {StoreService} from "../../../core/service/store.service";

@Component({
    selector: 'app-lista-integrantes',
    templateUrl: './lista-integrantes.component.html',
    styleUrls: ['./lista-integrantes.component.scss']
})
export class ListaIntegrantesComponent {
    @ViewChild('autoShownModal') public autoShownModal: ModalDirective;

     private integranteSelected = null;
     private currentUser = JSON.parse(localStorage.getItem('currentUser'));

     public busy: Promise<any>;
     public isModalShown = false;
     public currentPersona = new Persona();
     public modalAction = 'none';
     public formData:any = {};
     public selectUndefined: any;
     public lists = {
         'generos': Generos.export(),
         'tipoDocumentos': TipoDocumentos.export(),
         'estadosCiviles': EstadosCiviles.export(),
         'tipoContactos': TipoContactos.export(),
         'paises': [],
         'provincias': [],
         'localidades': []
     };
     public label(list, id) {
         if(!id) {
             return "";
         }
         var e = this.lists[list].find(x => x.id == id);
         if (e) {
             return e.label;
         } else {
             return "";
         }
     };
     public integrantes: Persona[] = [];

     public rebuildLists(integrante) {

      if(this.formData && this.formData.domicilio && this.formData.domicilio.localidad && this.formData.domicilio.localidad.provincia  && this.formData.domicilio.localidad.provincia.pais)
       this.lists.provincias = this.lists.provincias.filter(x=>x.pais.id===this.formData.domicilio.localidad.provincia.pais.id);
        /* this.lists.provincias = [];
         this.lists.localidades = [];
         const paises = Paises.export();
         let provincias = [];
         let localidades = [];

         if(!integrante || !integrante.domicilio) {
             return;
         }

         const domicilio = integrante.domicilio;

         // Busqueda de provincias
         if(domicilio.localidad && domicilio.localidad.provincia && domicilio.localidad.provincia.pais) {
             const pais = domicilio.localidad.provincia.pais.nombre;
             if (pais) {
                 const tmp = paises.find(x => x.nombre == pais);
                 if (tmp) {
                     provincias = tmp.provincias;
                     this.lists.provincias = provincias.map((e) => {
                         return e.nombre;
                     });
                     this.lists.provincias.sort();
                 }

                 const provincia = domicilio.localidad.provincia.nombre;
                 if(!provincias.find(x => x.nombre == provincia)) {
                     integrante.domicilio.localidad.provincia.nombre = this.selectUndefined;
                     integrante.domicilio.localidad.nombre = this.selectUndefined;
                 }
             }
         }

         // Busqueda de localidades
         if(domicilio.localidad && domicilio.localidad.provincia) {
             const provincia =  domicilio.localidad.provincia.nombre;
             if(provincia) {
                 const tmp = provincias.find(x => x.nombre == provincia);
                 if(tmp) {
                     localidades = tmp.localidades;
                     this.lists.localidades = localidades.map((e) => {
                         return e.nombre;
                     });
                     this.lists.localidades.sort();
                 }

                 const localidad = domicilio.localidad.nombre;
                 if(!localidades.find(x => x.nombre == localidad)) {
                     integrante.domicilio.localidad.nombre = this.selectUndefined;
                 }
             }
         }*/
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

     initListas(){

       this.lists.provincias= this.storeHelper.get('provincias');
       this.lists.paises =  this.storeHelper.get("paises");
       console.log("Provincias: "+ this.lists.provincias );

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
             this.busy = this.api.post(path, this.currentPersona).first().toPromise().then((res) => {
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
             this.busy = this.api.post(path, this.currentPersona).first().toPromise().then((res) => {
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
             console.log(this.currentPersona);
             this.busy = this.api.post(path, this.currentPersona).first().toPromise().then((res) => {
                 this.alertService.success('Integrante editado correctamente.');
             }, (error) => {
                 this.currentPersona = _.merge({}, prevPersona);
                 this.alertService.error('Ocurrió un error al intentar editar al integrante..');
             });
         }
     }



     constructor(private alertService: AlertService,
                 private api: ApiService,private metadataService:MetadataService,private storeHelper: StoreService) {
         // Popular listas
        this.initListas();
         const path = 'persona/email?email=' + this.currentUser.email;
         this.busy = this.api.get(path).first().toPromise()
             .then((res) => {
             if (res) {
                 this.currentPersona = _.merge(new Persona(), res);
                 console.log(res);
                 this.currentPersona.integrantes = [];
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
