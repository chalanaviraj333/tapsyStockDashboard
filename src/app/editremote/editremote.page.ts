import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavparamService } from '../navparam.service';

interface Car {
  brand: string;
  model: string;
  startyear: number;
  endyear: number;
}

interface Remote {
  key: string;
  tapsycode: string;
  boxnumber: number;
  inbuildchip: string;
  inbuildblade: string;
  buttons: number;
  frequency: string;
  battery: string;
  costperitem: string,
  ourprice: string,
  remotetype: string;
  compitablebrands: Array<string>;
  image: string;
  notes: string;
  compitablecars: Array<Car>;
}

@Component({
  selector: 'app-editremote',
  templateUrl: './editremote.page.html',
  styleUrls: ['./editremote.page.scss'],
})
export class EditremotePage implements OnInit {

  public remotes: Array<Remote> = [];
  public searchedItems: Array<Remote> = [];

  constructor(private http: HttpClient, private navParamService: NavparamService, private router: Router) { }

  ngOnInit() {

    this.http.get<{ [key: string]: Remote }>("https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json")
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {

            this.remotes.push({
              key,
              tapsycode: resData[key].tapsycode,
              boxnumber: resData[key].boxnumber,
              inbuildchip: resData[key].inbuildchip,
              inbuildblade: resData[key].inbuildblade,
              buttons: resData[key].buttons,
              frequency: resData[key].frequency,
              battery: resData[key].battery,
              costperitem: resData[key].costperitem,
              ourprice: resData[key].ourprice,
              remotetype: resData[key].remotetype,
              compitablebrands: resData[key].compitablebrands,
              image: resData[key].image,
              notes: resData[key].notes,
              compitablecars: resData[key].compitablecars

            });
          }
        }
        this.remotes.sort((a, b) => (a.boxnumber > b.boxnumber) ? 1 : -1)
      });

      this.searchedItems = this.remotes;
  }

  _ionChange(event) {

    const val = event.target.value;

    this.searchedItems = this.remotes;

    if (val && val.trim() != '') {
      this.searchedItems = this.searchedItems.filter((currentremote) => {
        let searchWord = currentremote.tapsycode;
        return (searchWord.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.searchedItems = [];
    }
  }


  onClickRemote(x){
    let selectedremote: object;

    for (let remote of this.remotes) {
      if (remote.tapsycode == x) {
        selectedremote = remote;
      }
    }

    this.navParamService.setNavData(selectedremote);
    this.router.navigateByUrl("editremoteitempage");
  }

}
