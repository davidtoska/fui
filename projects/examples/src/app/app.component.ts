import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar>
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
