import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Store} from "../../../core/service/store";
import {AlertService} from "../../../core/service/alert.service";
import {PersonaService} from "../../../core/service/persona.service";

@Component({
  selector: 'user-active',
  templateUrl: './user.active.component.html',
  styleUrls: ['./user.active.component.scss']
})
export class UserActiveComponent implements OnInit, OnDestroy {

  token:string;
  loading = false;
  constructor(private router: Router,
              private userService: PersonaService,
              private alertService: AlertService,
              private store: Store,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    // Capture the access token and code
    this.route
      .queryParams
      .subscribe(params => {
        this.token = params['token'];
        console.log("Token de activacion: "+this.token);
      });

    // do something with this.code and this.accesstoken
    let param= {token:this.token};
    this.userService.activate(param)
      .then(data => {
        this.alertService.success('Usuario Activado', true);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.alertService.error(error);
      });
  }

  ngOnDestroy(): void {

  }
}
