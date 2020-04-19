import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,LoadingController,AlertController } from 'ionic-angular';

// Config
import { BuscadorProvider } from '../../providers/buscador/buscador'
import { UsuarioProvider } from '../../providers/usuario/usuario'
import { URL_IMAGES } from '../../config/urlservicios';


@Component({
  selector: 'page-contacto',
  templateUrl: 'contacto.html',
})
export class ContactoPage {

	abogado:any[] = [];
  cliente:any;
  id_cliente:any;
  consulta:string="";
  comentarios:string="";
  valoracion:number;
  

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  private viewCtrl:ViewController,
          private _bs:BuscadorProvider,
          private _us:UsuarioProvider,
          private loadingCtrl: LoadingController,
          private alertCtrl : AlertController) {

    this._us.cargar_storage();
    this.abogado = this.navParams.get('perfil');
    this.id_cliente = this._us.id_cliente;

    console.log("Datos del abogado: " + this.abogado); 
    console.log("id_cliente: " + this.id_cliente);
  }


  enviar_consulta(){
      this._us.enviar_consulta(this.id_cliente,this.abogado['id'],this.valoracion)
      .subscribe( ()=>{});

      this.viewCtrl.dismiss();
     }

   regresar(){
      const alert = this.alertCtrl.create({
               title: 'Califica tu abogado:',
               subTitle: 'Calificar',
               cssClass: 'alertstar',
               enableBackdropDismiss:false,
               buttons: [
                    { text: '1', handler: data => { this.resolveRec(1);}},
                    { text: '2', handler: data => { this.resolveRec(2);}},
                    { text: '3', handler: data => { this.resolveRec(3);}},
                    { text: '4', handler: data => { this.resolveRec(4);}},
                    { text: '5', handler: data => { this.resolveRec(5);}}
               ]
          });
          alert.present();
    this.viewCtrl.dismiss();
  }

  resolveRec(calificacion: number){
    this._us.enviar_consulta(this.id_cliente,this.abogado['id'],calificacion)
      .subscribe( ()=>{});
    console.log('id_cliente: ' + this.id_cliente + ' Id_abogado: ' + this.abogado['id'] + ' Calificacion: ' + calificacion);
  }

    
}
