import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../../service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  message: any;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {

      if (message && !message.text) this.closeAlert();
      else {
        this.message = message;
        setTimeout(() => {
          this.closeAlert();
        }, 20000);
      }

    });
  }

  closeAlert() {
    this.message = undefined;
  }

}
