import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Model {
  key: string;
  brand: string;
  model: string;
  icon: string;
  modelyears: number[];
  selectedyears: number[];
  programmingMethod: string;
  accessMethod: string;
  allLostRemoteLocation: number;
  allLostRemoteShop: number;
  allLostMFKLocation: number;
  allLostMFKShop: number;
  spareRemoteLocation: number;
  spareRemoteShop: number;
  spareMFKLocation: number;
  spareMFKShop: number;
  ignitionRepairLocation: number;
  ignitionRepairShop: number;
  keyShellLocation: number;
  keyShellShop: number;
  gainingAccessLocation: number;
  gainingAccessShop: number;
  allLockChangeLocation: number;
  allLockChangeShop: number;

}

// interface ModelPrint{
//   key: string;
//   brand: string;
//   model: string;
//   icon: string;
//   years: number[];
// }

@Component({
  selector: 'app-carmodelpage',
  templateUrl: './carmodelpage.page.html',
  styleUrls: ['./carmodelpage.page.scss'],
})
export class CarmodelpagePage implements OnInit {

  public printmodels: Array<Model> = [];
  public models: Array<Model> = [];
  public priceSaved: boolean = false;

  public carbrands = [
    'ALFA ROMEO',
    'AUDI',
    'BMW',
    'CHRYSLER',
    'CITROEN',
    'DAEWOO',
    'DAIHATSU',
    'DODGE',
    'FIAT',
    'FORD',
    'HOLDEN',
    'HONDA',
    'HUMMER',
    'HYUNDAI',
    'ISUZU',
    'JAGUAR',
    'JEEP',
    'KIA',
    'LAND ROVER',
    'LEXUS',
    'MAZDA',
    'MINI',
    'MITSUBISHI',
    'NISSAN',
    'OPEL',
    'PEUGEOT',
    'RENAULT',
    'SAAB',
    'SKODA',
    'SUBARU',
    'SUZUKI',
    'TOYOTA',
    'VOLKSWAGEN',
    'VOLVO'];


  constructor(private router: Router, private http: HttpClient) { 

  }

  ngOnInit() {
    this.http.get<{ [key: string]: Model }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model-prices-access-programming.json')
    .subscribe(resData => {
      for (const key in resData) {

        const years = [];
        if (resData.hasOwnProperty(key)) {
          
          this.models.push({ key, brand: resData[key].brand, model: resData[key].model, icon: resData[key].icon, modelyears: resData[key].modelyears, selectedyears: [],
            programmingMethod: 'OBD', 
            accessMethod: 'Air Wedge',
            allLostRemoteLocation: 290,
            allLostRemoteShop: 220,
            allLostMFKLocation: 290,
            allLostMFKShop: 190,
            spareRemoteLocation: 220,
            spareRemoteShop: 180,
            spareMFKLocation: 190,
            spareMFKShop: 80,
            ignitionRepairLocation: 290,
            ignitionRepairShop: 190,
            keyShellLocation: 220,
            keyShellShop: 65,
            gainingAccessLocation: 120,
            gainingAccessShop: 120,
            allLockChangeLocation: 390,
            allLockChangeShop: 290,
           });
        }
      }
      this.printmodels = this.models.slice(0, 10);
    }); 
    
  }

  homePage(){
    this.router.navigateByUrl('home');
  }

  _addnewBrandButton(){

  }

  _addnewModelButton(){
    
  }


  modelSelect(x){
    
    var selectModel = {};


    this.models.forEach(model => {
      if (model.key == x)
      {
        selectModel = model;
      }
    });
  }


  _selectYear(selectedyear, selectkey){
    
    const arrayIndex = this.models.findIndex(x => x.key ===selectkey);

    this.models[arrayIndex].selectedyears.push(selectedyear);

    const index = this.models[arrayIndex].modelyears.indexOf(selectedyear, 0);
    if (index > -1) {
      this.models[arrayIndex].modelyears.splice(index, 1);
    }

  }


  submitlicked(modelkey)
  {
    const arrayIndex = this.models.findIndex(x => x.key ===modelkey);

    const addingCarmodelPrices: Model = {

        key: null,
        brand: this.models[arrayIndex].brand,
        model: this.models[arrayIndex].model,
        icon: this.models[arrayIndex].icon,
        modelyears: this.models[arrayIndex].selectedyears,
        selectedyears: null,
        programmingMethod: this.models[arrayIndex].programmingMethod,
        accessMethod: this.models[arrayIndex].accessMethod,
        allLostRemoteLocation: this.models[arrayIndex].allLostRemoteLocation,
        allLostRemoteShop: this.models[arrayIndex].allLostRemoteShop,
        allLostMFKLocation: this.models[arrayIndex].allLostMFKLocation,
        allLostMFKShop: this.models[arrayIndex].allLostMFKShop,
        spareRemoteLocation: this.models[arrayIndex].spareRemoteLocation,
        spareRemoteShop: this.models[arrayIndex].spareRemoteShop,
        spareMFKLocation: this.models[arrayIndex].spareMFKLocation,
        spareMFKShop: this.models[arrayIndex].spareMFKShop,
        ignitionRepairLocation: this.models[arrayIndex].ignitionRepairLocation,
        ignitionRepairShop: this.models[arrayIndex].ignitionRepairShop,
        keyShellLocation: this.models[arrayIndex].keyShellLocation,
        keyShellShop: this.models[arrayIndex].keyShellShop,
        gainingAccessLocation: this.models[arrayIndex].gainingAccessLocation,
        gainingAccessShop: this.models[arrayIndex].gainingAccessShop,
        allLockChangeLocation: this.models[arrayIndex].allLockChangeLocation,
        allLockChangeShop: this.models[arrayIndex].allLockChangeShop
    };

    this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model-prices.json', 
          addingCarmodelPrices).subscribe(
          postedData => {
            if (postedData !== undefined)
            {
              this.priceSaved = true;
              

            }
           });


    const yearsLeft = this.models[arrayIndex].modelyears.filter(value => !this.models[arrayIndex].selectedyears.includes(value));

    this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model-prices-access-programming/${modelkey}.json`,
    {...addingCarmodelPrices, modelyears:yearsLeft,
      selectedyears: null,
      programmingMethod: null,
      accessMethod: null,
      allLostRemoteLocation: null,
      allLostRemoteShop: null,
      allLostMFKLocation: null,
      allLostMFKShop: null,
      spareRemoteLocation: null,
      spareRemoteShop: null,
      spareMFKLocation: null,
      spareMFKShop: null,
      ignitionRepairLocation: null,
      ignitionRepairShop: null,
      keyShellLocation: null,
      keyShellShop: null,
      gainingAccessLocation: null,
      gainingAccessShop: null,
      allLockChangeLocation: null,
      allLockChangeShop: null

    }).subscribe(
      resData => {
        if (resData !== undefined)
             {
              this.models[arrayIndex].selectedyears = [];
               
             }

    });


    setTimeout(() => {
      this.priceSaved = false
    }, 5000);

  }

  _selectBrand(selectbrand){

    this.printmodels = [];

    this.models.forEach(model => {
      if (model.brand == selectbrand){
        this.printmodels.push(model);
      }
    });
  }
  

  loginbutton() {
    console.log('login button');
  }

}
