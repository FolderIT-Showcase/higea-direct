import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
/*
 Componente <select> reusable para Angular
 permite usarse con Reactive Forms y Model Driven Forms
 */
export class SelectComponent {

  // form reactivo
  @Input() formControl;
  // placeholder a mostrar dentro del select
  @Input() placeHolder = '';
  // lista de elementos a iterar
  @Input() list;
  // lista de propiedades a mostrar como option
  @Input() displayProp = [];
  // onChange Event callback
  @Output() change = new EventEmitter<any>();

  mModel: any = null;
  item = null;

  // onChange para model driven form
  @Output() onChange = new EventEmitter<any>();

  @Input()
  set setModel(item) {
    this.mModel = item;
  }

  // event emitter para onChange callback
  handleChange(item) {
    this.item = item;
    if (!this.formControl) {
      this.onChange.emit(item)
    }
  }

  label(item) {
    let str = '';

    // si no existe retorna
    if (!item) {
      return str;
    }

    // si tenemos un array de propiedades, las recorremos y las concatenamos con un espacio
    if (this.displayProp && this.displayProp.length) {

      this.displayProp.forEach(x => {
        if (item[x]) {
          str += item[x] + ' ';
        }
      });
      return str.toUpperCase();
    }

    // si no hay propiedades suponemos que el item es el string a mostrar
    if (item) {
      str = item;
    }
    // devolvemos en mayuscula
    return str.toUpperCase();
  }

  showPlaceholder() {
    if (!this.formControl) {
      return !this.item;
    }
    return !this.formControl.value;
  }

}
