import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddHabitPage } from './add-habit';


@NgModule({
  declarations: [
    AddHabitPage,
 
  ],
  imports: [
    IonicPageModule.forChild(AddHabitPage),
  ],
  exports: [
    AddHabitPage
  ]
})
export class AddHabitPageModule {

}
