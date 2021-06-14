import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  remotetype: string;
  compitablebrands: Array<string>;
  image: string;
  notes: string;
  compitablecars: Array<Car>;
}

@Component({
  selector: 'app-editremoteitempage',
  templateUrl: './editremoteitempage.page.html',
  styleUrls: ['./editremoteitempage.page.scss'],
})
export class EditremoteitempagePage implements OnInit {

  public remote_blade: string;
  public remote_chip: string;
  public remote_frequency: string;
  public remote_buttons: number;
  public remote_battery: string;
  public usdPrice: number;

  public selectedremote: Remote;

  constructor(private navParamService: NavparamService, private http: HttpClient ) { }

  ngOnInit() {
    this.selectedremote = this.navParamService.getNavData();
  }

  onClickSave(){

    const costPerItem = (this.usdPrice * 1.4).toFixed(2);
    const ourPrice = (this.usdPrice * 1.4 * 2).toFixed(2);



    this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${this.selectedremote.key}.json`,
    {...this.selectedremote,
      inbuildchip: this.remote_chip,
      // inbuildblade: this.remote_blade,
      buttons: this.remote_buttons,
      frequency: this.remote_frequency,
      battery: this.remote_battery,
      costperitem: costPerItem,
      ourprice: ourPrice,
      key: null}).subscribe(
      resData => {
        console.log(resData);
      }
    );
  }

}
