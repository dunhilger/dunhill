import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Button } from './button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})

export class PopupComponent implements OnInit {
  buttonName: FormControl;
  description: string;
  dividers: number[];
  activ: boolean = true;
  result: boolean = false;

  buttons: Button[] = [
    { title: '2', dividerValue: 2 },
    { title: '7', dividerValue: 7 },
    { title: '11', dividerValue: 11 },
    { title: '13', dividerValue: 13 },
    { title: '17', dividerValue: 17 },
    { title: '19', dividerValue: 19 }
  ];

  constructor(private dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) data, private _snackBar: MatSnackBar) {
    this.buttonName = new FormControl('MyButton', [Validators.required, Validators.pattern(/[A-Za-zА-Яа-яЁё]/), Validators.maxLength(8)]);
    this.description = data.description;
    this.dividers = [3, 5];
  };

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
    });
  };

  addDivider(dividerValue: number) {
    if (this.dividers.length < 3) {
      this.dividers.push(dividerValue);
    } else {                               //else { this.dividers[2] = dividerValue; }
      this.dividers.length = 2;
      this.dividers.push(dividerValue);
    }
    this.activ = false;
    console.log(this.dividers);
  };

  addButton() {
    let transferButton: { titleButton: any; dividerButton: number[]; };
    if (this.dividers.length === 3) {
      transferButton = {
        titleButton: this.buttonName.value,
        dividerButton: this.dividers
      };
      this.dialogRef.close(transferButton);
    } else {
      this.openSnackBar();
    }
  };

  closePopup(result: boolean) {
      this.dialogRef.close(result);
  };

  ngOnInit() {
  };
}

