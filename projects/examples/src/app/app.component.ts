import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar>
      <button mat-button routerLink="form1">Form1</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = "examples";
}
