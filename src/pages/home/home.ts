import { Component } from '@angular/core';
import { NavController,AlertController,MenuController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

// Paginas
import { SubcategoriasPage } from '../../pages/subcategorias/subcategorias';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  id_cliente:any ="";
  categorias:any[] = ['Familia','Penal','Laboral','Sucesion/Testamento','Daños y Perjuicios','Derecho Comercial','Accidentes de transito','Edificios/Alquiler','Jubilaciones y Pensiones','Mala Praxis','Defensa al consumidor','Mediacion','Contratos'];

  constructor(public navCtrl: NavController,
              private _us:UsuarioProvider,
              private alertCtrl:AlertController,
              private menuCtrl:MenuController) {    
    this.menuCtrl.enable(true, 'myMenu');
    console.log(this.categorias);

  }

  subcategoria(index:string){
    this.navCtrl.push(SubcategoriasPage,{
        categoria: index
    });
  }

  cerrar(){
  	this._us.cerrar_sesion();
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
            this.navCtrl.popToRoot();
            this._us.cerrar_sesion();
          }
        }
      ]
    });
    alert.present();
  }

  mostratMenu(){
    this.menuCtrl.toggle();
  }

  ionViewDidEnter(){
   if( this._us.usuario_activo){
        
   }else{
    this.presentAlert();
   }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Activacion pendiente',
      subTitle: 'Favor de revisar su correo con el enlace de activacion de su cuenta',
      buttons: ['OK']
    });
    alert.present();
  }

}
