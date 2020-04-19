import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,MenuController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-salir',
  templateUrl: 'salir.html',
})
export class SalirPage {

  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  			  private _us:UsuarioProvider,
  			  private alertCtrl:AlertController,
  			  private menuCtrl : MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalirPage');
  }

  cerrar(){
  	this.presentConfirm();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '¿Realmente desea salir?',
      message: 'Favor de eleguir opción',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log("No quiso salir");
          }
        },
        {
          text: 'Si',
          handler: () => {
            this._us.cerrar_sesion();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  mostratMenu(){
    this.menuCtrl.toggle();
  }

}
