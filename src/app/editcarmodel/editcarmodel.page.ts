import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Model {
  key: string;
  brand: string;
  model: string;
  icon: string;
  startyear: number;
  endyear: number;
}

@Component({
  selector: 'app-editcarmodel',
  templateUrl: './editcarmodel.page.html',
  styleUrls: ['./editcarmodel.page.scss'],
})
export class EditcarmodelPage implements OnInit {

  public models: Array<Model> = [];
  public carbrands = [];
  public selectedbrandModels: Array<Model> = [];

  public modelName: string;
  public modelStartYear: number;
  public modelEndYear: number;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    let allcarbrandswithduplicates = [];

    this.http.get<{ [key: string]: Model }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json')
      .subscribe(resData => {

        for (const key in resData) {
          allcarbrandswithduplicates.push(resData[key].brand);
          if (resData.hasOwnProperty(key)) {

            this.models.push({ key, brand: resData[key].brand, model: resData[key].model,icon: resData[key].icon, startyear: resData[key].startyear, endyear: resData[key].endyear });
            this.models.sort((a, b) => (a > b) ? 1 : -1)
          }
        }
        this.carbrands= allcarbrandswithduplicates.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        });

        this.carbrands.sort((a, b) => (a > b) ? 1 : -1)
  
      }
      );
  }

  brandclickButton(selectedcarbrand) {
    this.selectedbrandModels = [];

    this.models.forEach(model => {

      if (model.brand == selectedcarbrand)
      this.selectedbrandModels.push(model);
      
    });
  }

  onSelect(selectedbrandModel) {

    const editModelKey = selectedbrandModel.key;

     this.modelName = selectedbrandModel.model;
     this.modelStartYear = selectedbrandModel.startyear;
     this.modelEndYear = selectedbrandModel.endyear;

  }

  doneclicked() { 

  }

}


// return this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model/${editModelKey}.json`,
//     {...this.searchedItem[selectedRemoteShell], inStock: false, key: null}).subscribe(
//       resData => {
//         // console.log(resData);
//       }
//     );