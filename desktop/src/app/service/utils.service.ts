import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class UtilsService {

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

}
