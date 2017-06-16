import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class UtilsService {

  innerHeight: any;
  innerWidth: any;
  widhtResize: EventEmitter<any>;

  constructor() {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
  }

  public static throttle(callback: () => void, limit: number) {
    let wait = false;
    return () => {
      if (!wait) {
        callback();
        wait = true;
        setTimeout(() => {
          wait = false;
        }, limit);
      }
    }
  }

  public getWidth() {
    return window.innerWidth;
  }

  public setWidtEmitter(emitter) {
    this.widhtResize = emitter;
  }

  public getWidthResizeEvent() {
    return this.widhtResize;
  }

}
