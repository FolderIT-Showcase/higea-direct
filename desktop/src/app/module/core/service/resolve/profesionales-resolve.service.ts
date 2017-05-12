import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {AdminService} from '../admin.service';

@Injectable()
export class ProfesionalResolveService implements Resolve<any> {

  constructor(private adminService: AdminService) {
  }

  resolve(): Promise<any> {

    return this.adminService.getProfesionales();
  }

}
