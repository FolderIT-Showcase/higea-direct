import {EventEmitter, Injectable} from '@angular/core';

// declare const window: any;

@Injectable()
export class UtilsService {

  innerHeight: any;
  innerWidth: any;
  widhtResize: EventEmitter<any>;

  constructor() {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
  }

  public getWidth() {
    return this.innerWidth;
  }

  public setWidtEmitter(emitter) {
    this.widhtResize = emitter;
  }

  public getWidthResizeEvent() {
    return this.widhtResize;
  }

}
