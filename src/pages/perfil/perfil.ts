import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController } from 'ionic-angular';

// Config
import  { URL_IMAGES } from "../../config/urlservicios";
import { UsuarioProvider } from '../../providers/usuario/usuario'

// Paginas
import { ContactoPage } from '../contacto/contacto';


 @Component({
 	selector: 'page-perfil',
 	templateUrl: 'perfil.html',
 })
 export class PerfilPage {

 	perfil:any = {};
 	rutaimg = URL_IMAGES;
 	especialidades:string;
 	nombres:any;

 	constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private modalCtrl : ModalController,
              private _us:UsuarioProvider) {

 		this.perfil = this.navParams.get("perfil");
 		console.log(this.perfil);
 		this.especialidades = this.perfil['especialidad'];
 		this.nombres = this.especialidades.split(",");
 		console.log(this.nombres);
     this._us.cargar_storage();
     this._us.calificacion(this.perfil['id']).subscribe( (data)=>{

     });
     
 	}

 	

 	  ionViewCanLeave(){
    	// this.resultados = null;
    	// console.log(this.resultados);
        //this.showRadio();
  	}

  	showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    alert.addInput({
      type: 'radio',
      label: 'Excelente',
      value: '5',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Bien',
      value: '4',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Mas o menos',
      value: '3',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Mal',
      value: '2',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Pesimo',
      value: '1',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        
        console.log(data);
      }
    });
    alert.present();
  }

  mostrar_modal(){
    let modal = this.modalCtrl.create( ContactoPage, {'perfil' : this.perfil} );
    modal.present();
  }

 }
