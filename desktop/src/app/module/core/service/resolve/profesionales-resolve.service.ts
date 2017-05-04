import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {LoadingService} from '../loading.service';
import {AdminService} from '../admin.service';

@Injectable()
export class ProfesionalResolveService implements Resolve<any> {

  constructor(private adminService: AdminService, private loadingService: LoadingService) {
  }

  resolve(): Promise<any> {
    this.loadingService.start();
    return this.adminService.getProfesionales()
      .then(() => {
        this.loadingService.finish();
      })
      .catch(error => {
        this.loadingService.finish();
        console.error(error);
      })
  }

}
