import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,MenuController,Platform,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { BuscadorProvider } from '../../providers/buscador/buscador';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-iniciar',
  templateUrl: 'iniciar.html',
})

export class IniciarPage {
  email : string = "";
  password : string = "";
  semail:string;
  spass:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _us:UsuarioProvider,
    private _bs: BuscadorProvider,
    private loadingCtrl:LoadingController,
    public menuCtrl: MenuController,
    private platform : Platform,
    private storage : Storage,
    private alertCtrl : AlertController) {
        this.menuCtrl.enable(false, 'myMenu');
        this.cargar_storage();
        this.email = this.semail;
        this.password = this.spass;
  }

  ingresar(){
    let loading = this.loadingCtrl.create({
     content: 'Please wait...'
    });

    loading.present();

    this._us.ingresar(this.email, this.password)
    .subscribe( ()=>{
      if(this._us.usuario_activo() ){
        console.log("todo salio bien");
        loading.dismiss();
        this.navCtrl.push(HomePage);
      }else{
        console.log("todo salio mal");
        console.log(this.email + this.password);
        loading.dismiss();
      }
              //
    })
  }

  regresar(){
    this.navCtrl.pop();
  }

  recuperar_cuenta(){
    let alert = this.alertCtrl.create({
    title: 'Recuperar contraseña',
    inputs: [
      {
        name: 'email',
        placeholder: 'Correo Electronico'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Aceptar',
        handler: data => {
          this._bs.recuperar_contraseña(data['email']).subscribe(()=>{});
          console.log(data['email']);
          let alert2 = this.alertCtrl.create({
            title: "Recuperación de Contraseña",
            subTitle: "Se envio la peticion en breve recibiras un correo con tu contraseña",
            buttons: ['Ok']
          });
          alert2.present();
        }
      }
    ]
  });
  alert.present();
  }

  guardar_datos(){
    this.guardar_storage();
  }

  // Guardar Storage
  private guardar_storage(){
    if( this.platform.is("cordova")){
      // Device
      console.log("Inicializando Storgae");
      this.storage.ready()
          .then( ()=>{
              console.log("Storage listo");
              this.storage.set("email",this.email);
              this.storage.set("password",this.password);
              console.log("Se guardaron los datos");
          })
    }else{
      // Desktop
      if(this.email){
        localStorage.setItem("email",this.email);
        localStorage.setItem("password",this.password);
      }else{
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    }
  }

  // Cargar Storage
  cargar_storage(){
    let promesa = new Promise( (resolve,reject) =>{
        if(this.platform.is("cordova")){
          // Device
          this.storage.ready()
                      .then( ()=>{
                          this.storage.get('email')
                                      .then( email=>{
                                          if( email ){
                                            this.email = email;
                                          }
                                      })

                          this.storage.get("password")
                          .then( password=>{
                              if( password ){
                                this.password = password;
                              }
                              resolve();
                          })
                      })
        }else{
          // Desktop
          if(localStorage.getItem("email")){
            this.semail = localStorage.getItem("email");
            this.spass = localStorage.getItem("password");
          }
          resolve();
        }
    });
    return promesa;
  }





}
