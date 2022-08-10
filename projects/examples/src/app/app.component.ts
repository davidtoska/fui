import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar>
      <button mat-button routerLink="text">Text</button>
      <button mat-button routerLink="number">Number</button>
      <button mat-button routerLink="check-box">Checkbox</button>
      <button mat-button routerLink="radio">Radio</button>
      <button mat-button routerLink="auto-complete">Auto-complete</button>
      <button mat-button routerLink="select">Select</button>
      <button mat-button routerLink="slide-toggle">Slide-toggle</button>
      <button mat-button routerLink="button-toggle">Button-toggle</button>
      <button mat-button routerLink="color">Color</button>
      <button mat-button routerLink="date">Date</button>
      <button mat-button routerLink="form1">Adress-form</button>
      <button mat-button routerLink="dialog-forms">Dialog Forms</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = "examples";
}
