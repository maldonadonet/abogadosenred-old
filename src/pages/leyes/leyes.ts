import { Component } from '@angular/core';
import { NavController, MenuController,Platform,ModalController } from 'ionic-angular';
import { PdfPage } from '../pdf/pdf';




@Component({
  selector: 'page-leyes',
  templateUrl: 'leyes.html',
})
export class LeyesPage {
  pdfSrc: string;
  constructor(public navCtrl: NavController,
  			      private menuCtrl:MenuController,
              private platform: Platform,
              private modalCtrl:ModalController) {}

  mostratMenu(){
      this.menuCtrl.toggle();
  }

  abrirpdf(index:string){
    switch(index){
        case 'cod1':{
          const modal = this.modalCtrl.create(PdfPage,{
            ruta: 'http://abogadosenred.com.ar/pdf/pdf4.pdf'
          });
          modal.present();
          break;
        }
        case 'cod2':{
          const modal = this.modalCtrl.create(PdfPage,{
            ruta: 'http://abogadosenred.com.ar/pdf/pdf1.pdf'
          });
          modal.present();
          break;
        }
        case 'cod3':{
          const modal = this.modalCtrl.create(PdfPage,{
            ruta: 'http://abogadosenred.com.ar/pdf/pdf5.pdf'
          });
          modal.present();
          break;
        }
        case 'cod4':{
          const modal = this.modalCtrl.create(PdfPage,{
            ruta: 'http://abogadosenred.com.ar/pdf/pdf3.pdf'
          });
          modal.present();
          break;
        }
        case 'cod5':{
          const modal = this.modalCtrl.create(PdfPage,{
            ruta: 'http://abogadosenred.com.ar/pdf/pdf2.pdf'
          });
          modal.present();
          break;
        }
    }
  }

}
