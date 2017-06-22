import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from '../../../../service/alert.service';
import {PersonaService} from '../../../../service/persona.service';
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html'
})
export class RecoveryComponent implements OnInit {

  complexForm: FormGroup;

  ngOnInit(): void {

  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private personaService: PersonaService) {

    this.complexForm = fb.group({
      'email': [null, Validators.required],
    });
  }

  submitForm(data: any) {

    const email = data.email.trim();

    this.personaService.validateEmail(email)
      .then(() => {
        this.alertService.success('Verifique su cuenta de email para restablecer la contraseña');
        this.router.navigate(['/login']);
      });
  }

}
