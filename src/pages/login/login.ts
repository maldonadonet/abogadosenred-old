import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
// Paginas
import { IniciarPage } from '../iniciar/iniciar';
import { RegistrarPage } from '../registrar/registrar';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
                private menuCtrl:MenuController) {
        this.menuCtrl.enable(false, 'myMenu');
	}

	login(){
		console.log("Iniciar page");
		this.navCtrl.push(IniciarPage);
	}

	register(){
		console.log("Registrar page");
		this.navCtrl.push(RegistrarPage);
	}

}
