import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Providers
import { BuscadorProvider } from "../../providers/buscador/buscador";
import { UsuarioProvider } from "../../providers/usuario/usuario";

// Config
import  { URL_IMAGES } from "../../config/urlservicios";

// Pages
import { PerfilPage } from "../../pages/perfil/perfil";



@Component({
    selector: 'page-abogados',
    templateUrl: 'abogados.html',
})
export class AbogadosPage {

    resultados:any={};
    rutaimg = URL_IMAGES;
    perfilPage = PerfilPage;
    promedio:any;
    
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private _bs:BuscadorProvider,
                private _us:UsuarioProvider) {
    	this.resultados = this.navParams.get('item');

        console.log(_bs.resultados);
    }

	 // Evento cuando esta a punto de entrar a la pagina
	 ionViewWillEnter(){
	 	
	   if(this.resultados.length > 0){
	   		console.log("Con datos del APi rest");
	   }else{
	   		console.log("Aun no estan listos para mosgtrarse");
	   }
	 }

  	

}
