import { Component, OnInit } from '@angular/core';
import { Button } from './button';
import { Tile } from './tile';
import { ProcessService } from '../process.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-fizz-buzz',
  templateUrl: './fizz-buzz.component.html',
  styleUrls: ['./fizz-buzz.component.css'],
  providers: [ProcessService]
})
export class FizzBuzzComponent implements OnInit {

  tiles: Tile[] = [
    { title: 'FizzBuzz', cols: 3, rows: 1, color: 'gray', displayButtons: false, displayNumber: false, counterTrue: false, counterFalse: false },
    { title: '', cols: 1, rows: 1, color: 'gray', displayButtons: false, displayNumber: true, counterTrue: false, counterFalse: false },
    { title: '', cols: 1, rows: 1, color: 'gray', displayButtons: false, displayNumber: false, counterTrue: true, counterFalse: false },
    { title: '', cols: 1, rows: 1, color: 'gray', displayButtons: false, displayNumber: false, counterTrue: false, counterFalse: true },
    { title: '', cols: 3, rows: 1, color: 'gray', displayButtons: true, displayNumber: false, counterTrue: false, counterFalse: false },
    { title: 'Footer/rules', cols: 3, rows: 1, color: 'gray', displayButtons: false, displayNumber: false, counterTrue: false, counterFalse: false }
  ];

  buttons: Button[] = [
    { title: 'Fizz', divider: [3] },
    { title: 'Buzz', divider: [5] },
    { title: 'FizzBuzz', divider: [3, 5] },
    { title: 'None', divider: [] }
  ];

  showNum: number;
  showTrue: number;
  showFalse: number;
  inactiv: boolean;

  constructor(private process: ProcessService, public dialog: MatDialog) { };

  createButton() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      description: 'Create New Button'
    };
    let dialogRef = this.dialog.open(PopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  };

  generateNum(min: number, max: number) {
    this.showNum = this.process.random(min, max);
    this.inactiv = false;
  };

  processResult(divider: number[]) {
    let actDividers = [];
    let allDividers = [];
    this.buttons.forEach(item => {
      item.divider.forEach(elem => {
        if (allDividers.indexOf(elem) === -1) {
          allDividers.push(elem);
        };
      });
    });
    allDividers.forEach(elem => {
      if (this.showNum % elem === 0) {
        actDividers.push(elem);
      }
    });
    if (actDividers.length !== divider.length) {
      this.counter(false);
      return false;
    }
    let actDivSort = actDividers.sort();
    let dividerSort = divider.sort();
    let equals = true;
    actDivSort.forEach((elem, i) => {
      if (dividerSort[i] !== elem) {
        equals = false;
      };
    });
    this.counter(equals);
  };

  counter(equals: boolean) {
    if (equals) {
      this.showTrue++;
    } else {
      this.showFalse++;
    }
    this.generateNum(1, 300);
  };

  resetNum() {
    this.showNum = 0;
    this.showTrue = 0;
    this.showFalse = 0;
    this.inactiv = true;
  };

  ngOnInit() {
    this.showNum = 0;
    this.showTrue = 0;
    this.showFalse = 0;
    this.inactiv = true;
  };

}
