import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadingService} from '../../service/loading.service';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @ViewChild('staticModal') public staticModal: ModalDirective;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.loadingService.getMessage().subscribe(loading => {
      if (loading === true) {
        this.staticModal.show();
      } else {
        this.staticModal.hide();
      }
    });
  }

}
