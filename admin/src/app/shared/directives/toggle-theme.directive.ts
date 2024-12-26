import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleTheme]'
})
export class ToggleThemeDirective {
  private body:any = document.querySelector('body');
  constructor() { }

  @HostListener('click') toggleTheme(){
    if (this.body != !this.body) {
      this.body.classList.toggle('dark-theme');
    }
  }
}
