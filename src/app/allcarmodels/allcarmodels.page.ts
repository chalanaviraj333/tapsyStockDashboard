import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { Brand } from '../brand';

@Component({
  selector: 'app-allcarmodels',
  templateUrl: './allcarmodels.page.html',
  styleUrls: ['./allcarmodels.page.scss'],
})
export class AllcarmodelsPage implements OnInit {

  private models: Array<Model> = [];
  public brands: Array<Brand> = [];
  public selectedmodels: Array<Model> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get<{ [key: string]: Brand }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)){
              this.brands.push({key, name: resData[key].name, icon: resData[key].icon })
              this.brands.sort((a, b) => (a.name > b.name) ? 1 : -1)
          }

        }

    });

    this.http
      .get<{ [key: string]: Model }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/tapsynewdatabasecarmodels070621.json'
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
            this.models.sort((a, b) => (a.brand > b.brand ? 1 : -1));
          }
        }
      });
  }


  onClickSubmitButton(modelkey: string, itemstartyear: number, itemendyear: number) {

    let selectedmodel: Model;

    if (itemendyear < 1990 || itemendyear > 2021 || itemstartyear < 1990 || itemstartyear > 2021)
    {
      console.log('not a valid entry');
      return;
    }

    this.models.forEach(model => {
      if (model.key == modelkey) {
        selectedmodel = model;


        this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/tapsynewdatabasecarmodels070621/${modelkey}.json`,
    {...selectedmodel, startyear: Number(itemstartyear), endyear: Number(itemendyear), key: null}).subscribe(
      resData => {
        console.log(resData);
      }
    );
      }
    });


  }

  onClickDeleteModel(modelkey) {
    this.http.delete(`https://tapsystock-a6450-default-rtdb.firebaseio.com/tapsynewdatabasecarmodels070621/${modelkey}.json`).subscribe
          (resData => {
              console.log('Model Deleted')

           })
  }

  _selectBrand(selectbrand){

    this.selectedmodels = [];

    this.models.forEach(model => {
      if (model.brand == selectbrand){
        this.selectedmodels.push(model);
        this.selectedmodels.sort((a, b) => (a.model > b.model ? 1 : -1));
      }
    });
  }


}
