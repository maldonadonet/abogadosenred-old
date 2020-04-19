import { Component } from '@angular/core';
import { NavController, NavParams, MenuController,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-terminos',
  templateUrl: 'terminos.html',
})
export class TerminosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private menuCtrl:MenuController,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TerminosPage');
  }
  mostratMenu(){
    this.menuCtrl.toggle();
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

}
