import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FizzBuzzComponent } from './fizz-buzz/fizz-buzz.component'

const routes: Routes = [
  {path: 'fizzbuzz', component: FizzBuzzComponent},
  // {path: '', component: },
  // {path: '', component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
