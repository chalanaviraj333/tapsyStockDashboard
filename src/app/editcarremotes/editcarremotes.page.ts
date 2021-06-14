import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Remote } from "../remote";

@Component({
  selector: 'app-editcarremotes',
  templateUrl: './editcarremotes.page.html',
  styleUrls: ['./editcarremotes.page.scss'],
})
export class EditcarremotesPage implements OnInit {

  public remoteswithoutremotetype: Array<Remote> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http
      .get<{ [key: string]: Remote }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData[key].remotetype == undefined || resData[key].remotetype == null) {
            this.remoteswithoutremotetype.push({
              key,
              tapsycode: resData[key].tapsycode,
              boxnumber: resData[key].boxnumber,
              inbuildchip: resData[key].inbuildchip,
              inbuildblade: resData[key].inbuildblade,
              remotetype: resData[key].remotetype,
              battery: resData[key].battery,
              buttons: resData[key].buttons,
              costperitem: resData[key].costperitem,
              frequency: resData[key].frequency,
              remoteinStock: resData[key].remoteinStock,
              compitablebrands: resData[key].compitablebrands,
              image: resData[key].image,
              notes: resData[key].notes,
              compitablecars: resData[key].compitablecars,
            });
            this.remoteswithoutremotetype.sort((a, b) =>
              a.boxnumber > b.boxnumber ? 1 : -1
            );
          }
        }
      });
  }

  _editandupload() {
    this.remoteswithoutremotetype.forEach(remote => {
      if (remote.boxnumber == 182)
      {
        this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${remote.key}.json`,
    {...remote, remotetype: 'bladed', key: null}).subscribe(
      resData => {
        console.log(resData);
      }
    );
      }
    });
  }

}
