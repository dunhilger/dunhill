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
    { title: '', cols: 3, rows: 1, color: 'gray', displayButtons: false, displayNumber: false, counterTrue: false, counterFalse: false }
  ];

  getDefaultButtons() {
    return [
      { title: 'Fizz', divider: [3] },
      { title: 'Buzz', divider: [5] },
      { title: 'FizzBuzz', divider: [3, 5] },
      { title: 'None', divider: [] }
    ];
  }

  buttons: Button[] = this.getDefaultButtons();

  showNum: number;
  showTrue: number;
  showFalse: number;
  inactiv: boolean;
  activ: boolean;

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
      data => {
        if (data === false) {
          this.activ = false;
        } else {
          this.buttons.splice(3, 0, { title: data.titleButton, divider: data.dividerButton });
        }
      }
    );
    this.activ = true;
  };

  generateNum(min: number, max: number) {
    this.showNum = this.process.random(min, max);
    let result: boolean;
    let dividersEachButton: number[] = [];
    let booleanValues: boolean[] = [];
    this.buttons.forEach(item => {
      dividersEachButton = item.divider;
      result = this.processResult(dividersEachButton);
      booleanValues.push(result);
    });
    console.log(booleanValues);
    if (booleanValues.filter(item => item === true).length !== 1) {  //если в массиве не 1 true
      this.generateNum(min, max);                                    //то генерируется новое число
    }
    this.inactiv = false;
  };

  processResult(divider: number[]): boolean {
    let actDividers: number[] = [];              //массив из актуальных делителей
    let allDividers: number[] = [];              //массив из всех делителей
    this.buttons.forEach(item => {               //перебираем все кнопки
      item.divider.forEach(elem => {             //перебираем делители всех кнопок
        if (allDividers.indexOf(elem) === -1) {  //проверяем, есть ли такой делитель в массиве
          allDividers.push(elem);                //если нет - пушим в массив уникальные делители
        };
      });
    });
    allDividers.forEach(elem => {                //перебираем массив всех делителей
      if (this.showNum % elem === 0) {           //проверяем условием кратность сгенеренного числа и элемента массива всех делителей
        actDividers.push(elem);                  //если число делится без остатка, то пушим его в массив актуальных делителей
      }
    });
    if (actDividers.length !== divider.length) { //проверяем на неравенство длины массивов актуальных делителей и делителей, переданных кнопкой                
      return false;
    }
    let actDivSort = actDividers.sort();         //сортируем массив актуальных делителей
    let dividerSort = divider.sort();            //сортируем массив делителей, переданных кнопкой
    let equals = true;
    actDivSort.forEach((elem, i) => {            //проходим форычем по массиву актуальных делителей
      if (dividerSort[i] !== elem) {             //условие проверяет неравенство значения по индексу в массиве делителей кнопки и элемента массива актуальных делителей
        equals = false;
      };
    });
    return equals;
  };

  counter(divider: number[]) {
    let equals = this.processResult(divider);
    if (equals === true) {
      this.showTrue++;
    } else {
      this.showFalse++;
    }
    this.generateNum(1, 300);
  };

  reset() {
    this.showNum = 0;
    this.showTrue = 0;
    this.showFalse = 0;
    this.inactiv = true;
    this.buttons = this.getDefaultButtons();
    this.activ = false;
  };

  ngOnInit() {
    this.showNum = 0;
    this.showTrue = 0;
    this.showFalse = 0;
    this.inactiv = true;
  };
}



