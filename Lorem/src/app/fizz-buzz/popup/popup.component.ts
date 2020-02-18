import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})

export class PopupComponent implements OnInit {
  buttonForm: FormGroup;
  dividerNumber: number;
  buttonName: string;
  description: string;
  dividerArray: number[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  dividers: number[];

  constructor(private dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.buttonForm = new FormGroup({
      'buttonName': new FormControl('', [Validators.required, Validators.pattern(/[A-Za-zА-Яа-яЁё]/), Validators.maxLength(8)]),
      'dividerNumber': new FormControl('', [Validators.required, Validators.maxLength(3)])
    }) 
    this.description = data.description;
    this.dividerArray = [];
    this.dividers = [];
  };

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (value) {
      this.dividers.push(Number(value));
    }
    if (input) {
      input.value = '';
    }
    console.log(this.dividers);
  }

  remove(divider: number): void {
    const index = this.dividers.indexOf(divider);
    if (index >= 0) {
      this.dividers.splice(index, 1);
    }
  }

  // addDivider() {
  //   let divider = this.buttonForm.value.dividerNumber;
  //   this.dividerArray.push(Number(divider));
  //   console.log(this.dividerArray);
  // };

  addButton() {
    this.dialogRef.close(this.buttonForm.value);
    // console.log(this.buttonForm.value.dividerNumber);
  };

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    
  };
}


