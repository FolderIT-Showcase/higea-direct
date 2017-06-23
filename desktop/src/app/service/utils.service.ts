import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class Util {

  innerHeight: any;
  innerWidth: any;
  widhtResize: EventEmitter<any>;

  public static getWidth() {
    return window.innerWidth;
  }

  constructor() {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
  }

  public setWidtEmitter(emitter) {
    this.widhtResize = emitter;
  }

  public getWidthResizeEvent() {
    return this.widhtResize;
  }

  public static getFirstDefault(list: any[]) {
    if (list.length == 1) return list[0];
    return null;
  }

  public static label(props: any[]) {
    let mLabel = '';
    props.forEach(prop => {
      mLabel = mLabel + ' ' + prop.toUpperCase();
    });
    return mLabel;
  }

}
