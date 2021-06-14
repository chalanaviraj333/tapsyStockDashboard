import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/storage';

interface Remote {
  key: string;
  tapsycode: string;
  boxnumber: number;
  inbuildchip: string;
  inbuildblade: string;
  remotetype: string;
  compitablebrands: Array<string>;
  image: string;
  notes: string;
  compitablecars: Array<Object>;
}

interface Model {
  brand: string;
  model: string;
  icon: string;
  startyear: number;
  endyear: number;
}

@Component({
  selector: 'app-addremote',
  templateUrl: './addremote.page.html',
  styleUrls: ['./addremote.page.scss'],
})
export class AddremotePage implements OnInit {

  public carbrands = [];
  public allcars: Model[] = [];
  public selectedcarbrandmodels: Model[] = [];
  public selectedcarmodelyears: Array<number>;
  public addedcars: Model[] = [];

  public boxNumber: number;
  public tapsyCode: string;
  public inbuildChip: string;
  public inbuildBlade: string;
  public remoteType: string;
  public noTes: string;
  public compitableBrandsunsorted = [];
  public compitableBrands: Array<string>;
  public availableRemoteBox: number;

  public newRemotes: Remote[] = [];

  constructor(private http: HttpClient, private router: Router) {

    let allcarbrandswithduplicates = [];


    this.http.get<{ [key: string]: Model }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json')
      .subscribe(resData => {
        for (const key in resData) {
          allcarbrandswithduplicates.push(resData[key].brand);
          this.allcars.push(resData[key]);
        }
        this.carbrands = allcarbrandswithduplicates.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });

      });

    // this.http.get('https://tapsystock-a6450-default-rtdb.firebaseio.com/lastused-remotebox.json')
    // .subscribe(resData => {
    //   // this.availableRemoteBox = resData.lastusedRemoteBox;
    //   let remmmmote = resData;
    //   console.log(remmmmote);
    // });
  }

  ngOnInit() {

    this.http.get<{ [key: string]: Remote }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/newremotesadded.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            const iconname = (resData[key].image);
            firebase.storage().ref().child('images/remotes/' + iconname).getDownloadURL()
              .then(response => {

                this.newRemotes.push({key,
                  tapsycode: resData[key].tapsycode,
                  boxnumber: resData[key].boxnumber,
                  inbuildchip: resData[key].inbuildchip,
                  inbuildblade: resData[key].inbuildblade,
                  remotetype: resData[key].remotetype,
                  compitablebrands: resData[key].compitablebrands,
                  image: response,
                  notes: resData[key].notes,
                  compitablecars: resData[key].compitablecars

                });
              })

          }
        }
      }
      );
  }

  onChangeBrand(selectedcarbrand) {
    this.selectedcarbrandmodels = [];
    this.allcars.forEach(car => {
      if (car.brand == selectedcarbrand.target.value) {
        this.selectedcarbrandmodels.push(car);
      }
    });
  }

  onChangeModel(selectedcarmodel) {
    this.selectedcarmodelyears = [];
    let selectedmodel: Model;
    this.selectedcarbrandmodels.forEach(car => {
      if (car.model == selectedcarmodel.target.value) {
        selectedmodel = car;
      }
    });
    for (let i = selectedmodel.startyear; i <= selectedmodel.endyear; i++) {
      this.selectedcarmodelyears.push(i);
    }
  }


  onSubmit(form: NgForm) {

    this.addedcars.push(form.value);
    this.compitableBrandsunsorted.push(form.value.brand);

    this.compitableBrands = this.compitableBrandsunsorted.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });

    console.log(this.compitableBrands);
  }

  doneclicked() {

    const iconname = this.tapsyCode.replace(/\s/g, "") + '.png';

    const newRemote: Remote = { key: null,
      tapsycode: this.tapsyCode, boxnumber: this.boxNumber, inbuildchip: this.inbuildChip, inbuildblade: this.inbuildBlade,
      remotetype: this.remoteType, image: iconname, notes: this.noTes, compitablebrands: this.compitableBrands, compitablecars: this.addedcars
    };

    this.newRemotes.push(newRemote);


    this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/newremotesadded.json', newRemote).subscribe(
      resData => {
        console.log(resData);
      }
    );

    // this.router.navigateByUrl('additems');
    // this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/lastused-remotebox/${}.json`, this.boxNumber).subscribe(
    //   resData => {
    //     console.log(resData);
    //   }
    // );

  }

  refreshImagesButton(){

    this.newRemotes.forEach(newremote => {

      this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json', {...newremote, remoteinStock: true, key: null}).subscribe(
      resData => {
        if (resData !== undefined) {
          const index = this.newRemotes.indexOf(newremote, 0);
        if (index > -1) {
          this.newRemotes.splice(index, 1);
          }

          this.http.delete(`https://tapsystock-a6450-default-rtdb.firebaseio.com/newremotesadded/${newremote.key}.json`).subscribe
          (resData => {


           })
        }

        }

    );

    });

  }


}

