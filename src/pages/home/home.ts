import { Component } from '@angular/core';
import { PopoverController, ModalOptions,Platform } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { ModalController } from 'ionic-angular';
import { AddHabitPage } from '../add-habit/add-habit';
import { DatabaseProvider } from "../../providers/database/database";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  records: Array<any>;
  recordsValue: boolean;
  todayDay:string;
  todayDate:any;
  yesterdayDay:string;
  yesterdayDate:any;
  dayBefYesterDay:string;
  dayBefYesterDate:any;
  dayBefYester1Day:string;
  dayBefYester1Date:any;


  constructor(private databaseProvider: DatabaseProvider, private platform: Platform, public popoverCtrl: PopoverController,public modalCtrl:ModalController) 
  {
    this.recordsValue = true;   
    this.platform.ready().then(() =>{
        console.log("After Open DB");
        this.getSubHeader();
    });
  }    
  
  presentPopover(myEvent) 
  {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present
    ({
      ev: myEvent
    });
  }

  getSubHeader()
  {
    this.todayDay = this.getWeekDayName(new Date().getDay());
    this.yesterdayDay = this.getWeekDayName(new Date().getDay()-1);
    this.dayBefYesterDay = this.getWeekDayName(new Date().getDay()-2);
    this.dayBefYester1Day = this.getWeekDayName(new Date().getDay()-3);

    this.todayDate = new Date().getDate();
    this.yesterdayDate = new Date().getDate()-1;
    this.dayBefYesterDate = new Date().getDate()-2;
    this.dayBefYester1Date = new Date().getDate()-3;
  }

  getWeekDayName(weekNum):string{
    weekNum =  weekNum < 0 ? weekNum + 7 : weekNum;
    switch(weekNum)
    {
      case 0: return "SUN";
      case 1: return "MON";
      case 2: return "TUE";
      case 3: return "WED";
      case 4: return "THUR";
      case 5: return "FRI";
      case 6: return "SAT";
    }
  }

  showConfirm() 
  {
    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      cssClass: '$modal-inset-min-width:50px'
    }
    let myModal = this.modalCtrl.create(AddHabitPage,myModalOptions);
    myModal.present(); 
  }
  
  public doRefresh(refresher) 
  {
    console.log('Begin async operation', refresher);
    this.fetch();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
   }

    public ngOnInit() {
        setTimeout(() => {
          this.platform.ready().then(() =>{
            this.fetch()
          });
        }, 500);
    }
    public fetch() 
    {
        this.databaseProvider.fetch().then(result => {
            this.records = result;
            this.recordsValue = false;
            console.log("Fetch Records:" + JSON.stringify(this.records));
        });
    }
}