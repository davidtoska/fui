import { Component, OnInit } from "@angular/core";
import { DialogFormService } from "@fui/forms";
import { NameDialog } from "./forms";

@Component({
  selector: "app-dialog-forms",
  templateUrl: "./dialog-forms.component.html",
  styleUrls: ["./dialog-forms.component.scss"]
})
export class DialogFormsComponent implements OnInit {
  constructor(private readonly dialogService: DialogFormService) {}

  ngOnInit(): void {
    this.openSimpleDialog();
  }

  openSimpleDialog() {
    const dialogRef = this.dialogService.open(NameDialog);
    dialogRef.onSaveButtonClicked(model => {
      console.log(model);
      if (model.name) dialogRef.setLoading("Saving your name");
      setTimeout(() => {
        dialogRef.close();
      }, 3000);
    });
  }
}
