import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../service/alert.service';
import {Http} from '@angular/http';
import {PersonaService} from '../../../../service/persona.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../domain/user';

@Component({
  selector: 'app-recovery-user',
  templateUrl: './recovery.user.component.html'
})
export class RecoveryUserComponent implements OnInit {

  complexForm: FormGroup;
  token: string;
  password: string;
  loading = false;
  title = '';

  passwordMatcher = (control: AbstractControl): { [key: string]: boolean } => {
    const password1 = control.get('password1');
    const password2 = control.get('password2');
    if (!password1 || !password2) return null;
    return password1.value === password2.value ? null : {nomatch: true};
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private http: Http,
              private personaService: PersonaService,
              private alertService: AlertService,
              private route: ActivatedRoute) {

    this.complexForm = fb.group({

      'password1': [null, Validators.required],
      'password2': [null, [Validators.required, this.passwordMatch]],

    }, {validator: this.passwordMatcher});

  }

  submitForm(form: any) {
    const user: User = new User();
    user.password = form.password1.trim();
    // do something with this.code and this.accesstoken
    this.personaService.changePassword(this.token, user)
      .then(data => {
        this.router.navigate(['/login']).then(() => {
          this.alertService.success('Usuario Restablecido');
        });
      });
  }

  ngOnInit(): void {
    // Capture the access token and code
    this.route
      .queryParams.first().toPromise()
      .then(params => {
        this.token = params['token'];
      });
  }

  private passwordMatch() {
    return (c: FormControl) => {
      return (c.value === this.complexForm.value.password1) ? null : {'passwordMatch': {valid: false}};
    }
  }

}
