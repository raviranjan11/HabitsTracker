import { Component} from '@angular/core';
import { IonicPage,ViewController} from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { DatabaseProvider } from "../../providers/database/database";

@IonicPage()
@Component({
  selector: 'page-add-habit',
  templateUrl: 'add-habit.html',
})

export class AddHabitPage 
{
  remindAt:any;
  hrs:any;
  min: any;
  ampm:any;
  repeat:any;
  records: Array<any>;

  constructor(private databaseProvider: DatabaseProvider,public datePicker: DatePicker,public viewCtrl: ViewController) 
  {
    this.remindAt = "Off";
    this.repeat = "EveryDay";
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad AddHabitPage');
  }

  closeModal() 
  {
    this.viewCtrl.dismiss();
    console.log(this.viewCtrl.data);
  }

  showDatePicker()
  {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
                this.hrs = date.getHours() > 12 ? date.getHours() - 12 : date.getHours() == 0 ? 12 : date.getHours();
                this.ampm = date.getHours() < 12 ? "AM" : "PM";
                this.min = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
                this.remindAt = this.hrs + ":" + this.min + " " +this.ampm;
              },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  addHabit(name,question,repeat,remindAt){
    this.records = [name,question,repeat,remindAt];
    this.databaseProvider.insert(this.records);
    this.viewCtrl.dismiss();
  }
}
