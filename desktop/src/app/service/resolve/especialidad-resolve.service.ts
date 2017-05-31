import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {AdminService} from '../admin.service';

@Injectable()
export class EspecialidadResolveService implements Resolve<any> {

  constructor(private adminService: AdminService) {
  }

  resolve(): Promise<any> {
    return this.adminService.getEspecialidades();
  }

}
