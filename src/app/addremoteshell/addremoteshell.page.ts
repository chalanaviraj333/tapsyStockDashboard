import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import firebase from 'firebase/app';
import 'firebase/storage';


interface RemoteShell {
  key: string;
  tapsycode:string;
  boxnumber: number;
  remotetype: string;
  compitablebrands: Array<string>;
  image: string;
  blade: string;
  buttons: string;
  notes: string;
  inStock: boolean;
}

interface Brand {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-addremoteshell',
  templateUrl: './addremoteshell.page.html',
  styleUrls: ['./addremoteshell.page.scss'],
})
export class AddremoteshellPage implements OnInit {

  public brands = [];
  public newRemoteShells: RemoteShell[] = [];

  constructor(private http: HttpClient) { 
  }

  onSubmit(form: NgForm) 
  {

    const iconname = form.value.tapsycode.replace(/\s/g, "") + '.png';

    const keyShell: RemoteShell = {key: null, tapsycode:form.value.tapsycode, boxnumber:form.value.boxnumber, remotetype:'keyshell', compitablebrands:form.value.compitablebrands,
                                  image:iconname, blade:form.value.blade, buttons:form.value.buttons, notes:form.value.notes, inStock: true}
    return this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/new-remote-shells.json', keyShell).subscribe(
      resData => {
        console.log(resData);
      }
    );
  }

  ngOnInit() {

    this.http.get<{ [key: string]: Brand}>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json')
    .subscribe(resData => {
      for (const key in resData) {
        this.brands.push(resData[key].name)
        this.brands.sort((a, b) => (a > b) ? 1 : -1)
      }
      }
    );


    this.http.get<{ [key: string]: RemoteShell}>('https://tapsystock-a6450-default-rtdb.firebaseio.com/new-remote-shells.json')
    .subscribe(resData => {
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          const iconname = (resData[key].image);
            firebase.storage().ref().child('images/keyshells/' + iconname).getDownloadURL()
              .then(response => {
                
                  this.newRemoteShells.push({ key,
                  tapsycode:resData[key].tapsycode,
                  boxnumber: resData[key].boxnumber,
                  remotetype: resData[key].remotetype,
                  compitablebrands: resData[key].compitablebrands,
                  image: response,
                  // image: resData[key].image,
                  blade: resData[key].blade,
                  buttons: resData[key].buttons,
                  notes: resData[key].notes,
                  inStock: resData[key].inStock}
                  
    
                );
              })
            
        }
      }
      }
    );
  }


  refreshImagesButton(){

    this.newRemoteShells.forEach(keyshell => {

      this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells.json', {...keyshell, key: null}).subscribe(
      resData => {
        if (resData !== undefined) {
          const index = this.newRemoteShells.indexOf(keyshell, 0);
        if (index > -1) {
          this.newRemoteShells.splice(index, 1);
          }

          this.http.delete(`https://tapsystock-a6450-default-rtdb.firebaseio.com/new-remote-shells/${keyshell.key}.json`).subscribe
          (resData => {

      
           })
        }

        }
        
    );
      
    });

  }

}
