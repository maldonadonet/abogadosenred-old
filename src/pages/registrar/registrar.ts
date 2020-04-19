import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { IniciarPage } from '../iniciar/iniciar';

@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  email : string = "";
  password : string = "";
  nombre :  string = "";
  direccion :  string = "";
  telefono :  string = "";
  dni :  string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _us:UsuarioProvider,
    private alertCtrl : AlertController,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('Pagina de registro iniciada');
  }

  registrar(){
    let loading = this.loadingCtrl.create({
      content: 'Registrando datos...'
    });

    loading.present();

    this._us.registrar(this.email,this.password,this.nombre,this.telefono,this.dni,this.direccion)
    .subscribe( ()=>{
      if(this._us.usuario_activo() ){
        loading.dismiss();
        console.log("Registro de cliente exitoso");
        this.navCtrl.push(IniciarPage);
        this.alertCtrl.create({
          title:"Registro correcto",
          subTitle : "En breve te llegara un Email de confirmacion a tu  bandeja de correo electronico para iniciar sesion correctamente.",
          buttons:["Ok"]
        }).present();
      }else{
        loading.dismiss();
        this.alertCtrl.create({
          title:"Error en el Registro",
          subTitle : "Favor de verificar datos y conexion",
          buttons:["Ok"]
        }).present();
        console.log("Error al registrar cliente");
      }
              //
            })
  }

  regresar(){
    this.navCtrl.pop();
  }

}
