import {Component, EventEmitter} from '@angular/core';
import {UtilsService} from './module/core/service/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  widhtResize: EventEmitter<any> = new EventEmitter<any>();

  constructor(private utilsService: UtilsService) {
    this.utilsService.setWidtEmitter(this.widhtResize);
  }

  onResize(event) {
    this.widhtResize.emit(event.target.innerWidth);
  }
}
