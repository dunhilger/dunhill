import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  public random(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  public result() {
    
  };

  public pointCounter() {

  };

  constructor() { }
}
