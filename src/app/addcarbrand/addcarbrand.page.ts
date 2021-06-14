import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import firebase from 'firebase/app';
import 'firebase/storage';

interface Brand {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-addcarbrand',
  templateUrl: './addcarbrand.page.html',
  styleUrls: ['./addcarbrand.page.scss'],
})
export class AddcarbrandPage implements OnInit {

  private newcarbrands: Brand[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) 
  {

    const iconname = form.value.carbrand.toLowerCase( ) + '.png';

    this.newcarbrands.push({name:form.value.carbrand , icon:iconname});

    // const iconname = form.value.carbrand.replace(/\s/g, "") + '.png';
    // return this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brandTesting.json', {name:form.value.carbrand, icon:iconname}).subscribe(
    //   resData => {
    //     console.log(resData);
    //   }
    // );
  }


  uploadButton(){
    this.newcarbrands.forEach(newcarbrand => {

      firebase.storage().ref().child('images/' + newcarbrand.icon).getDownloadURL().then
      (response => {

        this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json', {...newcarbrand, icon: response}).subscribe()
    
        });

      }

      )
            

  }
      

}
