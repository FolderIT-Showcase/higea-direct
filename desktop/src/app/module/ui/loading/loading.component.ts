import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../../../service/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loading = false;
  constructor(private loadingService: LoadingService) {
  }
  ngOnInit() {
    this.loadingService.getMessage().subscribe(promises => {
      this.loading = !!promises;
    });
  }
}
