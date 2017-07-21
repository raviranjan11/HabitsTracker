import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import {BehaviorSubject} from 'rxjs/Rx';
import {Storage} from '@ionic/storage';
import { HttpModule } from '@angular/http';


/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private isInstantiated: boolean;
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(private platform: Platform,public http: Http,public httpModule:HttpModule, private sqliteporter:SQLitePorter, private sqlite:SQLite, public storage:Storage) {
    console.log('Hello Database Provider');
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() =>{
     this.sqlite.create({
       name: 'HabitTrackerDB',
       location:'default'
    })
    .then((db:SQLiteObject) =>{
        this.database = db;
        this.database.executeSql("CREATE TABLE IF NOT EXISTS Habit (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, question TEXT,repeat TEXT,remindAt TEXT)",{})
          .then((data) => {
              this.isInstantiated = true;
              console.log("In Create Table");
              console.log("Data: " + data)
          },(error) => {
              console.error("CREATE TABLE ERROR: ",error);
        })
       },(error) =>{
          console.error("OPEN DATABASE ERROR: ", error);
      })
    });

  }
  public insert(data: any): Promise<any> {
        return this.database.executeSql("INSERT INTO Habit (name, question,repeat,remindAt) VALUES (?,?,?,?)", [data]);
  }

  public fetch(): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("In Fetch()");
            this.database.executeSql("SELECT * FROM Habit", []).then((data) => {
            console.log("In SELECT" + data.rows.length);      
                let records = [];
                if (data.rows.length > 0) 
                {
                  for (var i = 0; i < data.rows.length; i++) 
                  {
                    records.push({ name: data.rows.item(i).name, question: data.rows.item(i).question,repeat: data.rows.item(i).repeat, remindAt: data.rows.item(i).remindAt });
                  }
                }
                resolve(records);
            }, error => {
                reject(error);
            });
        });
    }


    deleteDatabase()
    {
        this.platform.ready().then(() =>{
            this.sqlite.deleteDatabase({
              name: 'HabitTrackerDB',
              location:'default'
            }).then(
              error=> {
                console.log("Error while delete database " + error);
              }
            );
        });
    } 

    deleteAllRecords()
    {
        this.database.executeSql("DELETE FROM Habit", []).then((data) => {
        console.log("All Records Deleted" + data);
        this.fetch();
        }, err => {
            console.log('Error: ', err);
        });
    }

    getDatabaseState() {
        return this.databaseReady.asObservable();
    }
}
