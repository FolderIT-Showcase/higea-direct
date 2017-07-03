import {AfterViewInit, Directive, ElementRef, Input, Renderer} from '@angular/core';

@Directive({
  selector: '[focus]'
})

export class FocusDirective implements AfterViewInit {
  @Input('focus') value: string;

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  // Focus to element: if value 0 = don't set focus, 1 = set focus
  ngAfterViewInit() {
    if (this.value === '0') {
      return;
    }
    this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
  }
}
