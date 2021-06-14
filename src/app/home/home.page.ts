import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/storage';


import { environment } from '../../environments/environment';


interface Model {
  key: string;
  brand: string;
  model: string;
  icon: string;
  startyear: number;
  endyear: number;
  modelyears: number[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public priceSaved: boolean = false;

  constructor(private router: Router, private http: HttpClient) {

    firebase.initializeApp(environment.firebase);
   }

// addCarBrand() {
//   this.router.navigateByUrl('addcarbrand');
// }

// addCarModel() {
//   this.router.navigateByUrl('addmodel');
// }

// addNewRemote() {
//   this.router.navigateByUrl('addremote');
// }

// addProgDetails() {
//   this.router.navigateByUrl('programmingdetails');
// }

// editCarModel() {
//   this.router.navigateByUrl('editcarmodel');
// }

// editRemote() {
//   this.router.navigateByUrl('editremote');
// }

// editCarDetails() {
//   this.router.navigateByUrl('editcardetails');
// }

// addRemoteShell() {
//   this.router.navigateByUrl('addremoteshell');
// }

homePage(){
  this.router.navigateByUrl('home');
}

_carmodelsButton(){
    this.router.navigateByUrl('carmodelpage');

}

_remoteButton(){
  this.router.navigateByUrl('editremote');
}

_remoteShellButton(){
  this.router.navigateByUrl('addremoteshell');
}

_kdRemotesButton(){

}

_kdBladesButton() {

}

_mfkKeysButton() {

}
_garageRemotesButton() {

}

_remoteCircuitsButton() {

}

_lowStockButton() {

}


loginButton() {

  this.http.get<{ [key: string]: Model }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json')
    .subscribe(resData => {
      for (const key in resData) {

        const years = [];
        if (resData.hasOwnProperty(key)) {

        //   if (resData[key].brand == 'ALFA ROMEO'){
        //     console.log(resData[key]);
        // }

          for (let i = resData[key].startyear; i <= resData[key].endyear; i++) {
            years.push(i);
          }

          this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model-prices-access-programming.json',
          {brand: resData[key].brand, model: resData[key].model, icon: resData[key].icon, modelyears: years}).subscribe(
          postedData => {
              console.log(postedData);
           }
          );

        }
      }
    });
}


}
