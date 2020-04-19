import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';

@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html',
})
export class PdfPage {
  
  pdfSrc: string;
  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl:ViewController,
              private browserTab: BrowserTab){
                
       this.pdfSrc =  this.navParams.get('ruta');
       this.abrirpdf();
  
  }

  abrirpdf(){
    console.log("Entro en la funcion de los pdf");
    console.log(this.pdfSrc);
     this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        this.browserTab.openUrl(this.pdfSrc);
      } else {
        // open URL with InAppBrowser instead or SafariViewController
      }
    });
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

}
