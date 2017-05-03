import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {StoreService} from 'app/module/core/service/store.service';
import {LoadingService} from '../loading.service';
import {AdminService} from '../admin.service';

@Injectable()
export class EspecialidadResolveService implements Resolve<any> {

  constructor(private adminService: AdminService,
              private storeService: StoreService,
              private loadingService: LoadingService) {
  }

  resolve(): Promise<any> {
    this.loadingService.start();
    return this.adminService.getEspecialidades()
      .then(() => {
        this.loadingService.finish();
      });
  }

}
