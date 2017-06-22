import {Component, Input, OnInit} from '@angular/core';

interface step {
  label: ''
  description: '';
  order: 0;
  ngClass: '' // clases de los botones de bootstrap
}

@Component({
  selector: 'app-info-step',
  templateUrl: './info-step.component.html',
  styleUrls: ['./info-step.component.scss']
})
export class InfoStepComponent implements OnInit {

  @Input() steps: step[] = [];

  ngOnInit(): void {
    this.steps.forEach((step: any) => {
      if (!step.ngClass) step.ngClass = 'btn-warning';
    })
  }
}
