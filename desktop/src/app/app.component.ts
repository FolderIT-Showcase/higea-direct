import {Component, EventEmitter, OnInit} from '@angular/core';
import {Util} from './service/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  widhtResize: EventEmitter<any> = new EventEmitter<any>();

  constructor(private utilsService: Util) {
  }

  ngOnInit(): void {
    this.utilsService.setWidtEmitter(this.widhtResize);
  }

  onResize(event) {
    this.widhtResize.emit(event.target.innerWidth);
  }
}
