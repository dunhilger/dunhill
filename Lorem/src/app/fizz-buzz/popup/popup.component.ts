import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Button } from './button'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})

export class PopupComponent implements OnInit {
  buttonForm: FormGroup;
  buttonName: string;
  buttonDivider: number;
  description: string;
  dividers: number[];
  displayNumber: number;

  buttons: Button[] = [
    { title: '2', dividerValue: 2 },
    { title: '7', dividerValue: 7 },
    { title: '11', dividerValue: 11 },
    { title: '13', dividerValue: 13 },
    { title: '17', dividerValue: 17 },
    { title: '19', dividerValue: 19 }
  ];

  constructor(private dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.buttonForm = new FormGroup({
      'buttonName': new FormControl('MyButton', [Validators.required, Validators.pattern(/[A-Za-zА-Яа-яЁё]/), Validators.maxLength(8)]),
      'buttonDivider': new FormControl([Validators.required]),
    })
    this.description = data.description;
    this.dividers = [3, 5];
  };

  addDivider(dividerValue: number) {
    this.dividers.push(dividerValue);
    console.log(this.dividers);
  }

  addButton() {
    let transferButton = {
      titleButton: this.buttonForm.value.buttonName,
      dividerButton: this.dividers
    };
    this.dialogRef.close(transferButton);
  };

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  };
}

