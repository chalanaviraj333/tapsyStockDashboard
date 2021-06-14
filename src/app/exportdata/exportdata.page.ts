import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Model } from '../model';

@Component({
  selector: 'app-exportdata',
  templateUrl: './exportdata.page.html',
  styleUrls: ['./exportdata.page.scss'],
})
export class ExportdataPage implements OnInit {
  private models: Array<Model> = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ [key: string]: Model }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.models.push({
              key,
              brand: resData[key].brand,
              model: resData[key].model,
              icon: resData[key].icon,
              startyear: resData[key].startyear,
              endyear: resData[key].endyear
            });
          }
        }
      });
  }

  _exportallModels() {

    // this.models.forEach(model => {
    //   this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/tapsynewdatabasecarmodels070621.json', {...model, key: null}).subscribe(
    //   resData => {
    //     console.log(resData);
    //   })
    // });
  }
}
