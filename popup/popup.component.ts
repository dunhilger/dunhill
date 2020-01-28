import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  buttonForm: FormGroup;
  dividerNumber: any;
  buttonName: string;
  description: string;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.description = data.description;
  };

  addDivider() {
    let divArray =[];
    this.dividerNumber = document.getElementsByTagName("input")[0].value;
    if (divArray.length < 3) {
      divArray.push(this.dividerNumber);
    }
    console.log(divArray);
  };

  addButton() {
    this.dialogRef.close(this.buttonForm.value);
    // console.log(this.buttonForm.value.dividerNumber);
  };

  ngOnInit() {
    this.buttonForm = this.fb.group({
      description: [this.description, []],
      buttonName: ['', [Validators.required, Validators.pattern(/[A-Za-zА-Яа-яЁё]/), Validators.maxLength(8)]],
      dividerNumber: ['', [Validators.required, Validators.pattern(/[0-9]/), Validators.maxLength(1)]],
    });
    // this.buttonForm.valueChanges.subscribe((value) => console.log(value));
  };

  close() {
    this.dialogRef.close();
  };
}
