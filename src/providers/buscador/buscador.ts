import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { URL_SERVICIOS } from '../../config/urlservicios';
import 'rxjs/add/operator/map';


@Injectable()
export class BuscadorProvider {

    token:string;
    id_vendedor:string;
    resultados:any[] = [];

    constructor(public http: HttpClient,
                private alertCtrl : AlertController) {}

    buscar_producto( termino:string ){
    let url = URL_SERVICIOS + "Abogados/buscar/" + termino;

    this.http.get( url )
            .subscribe( data =>{
                if(data["error"]){
                   // Manejar el error
                   console.log("Encontro un error");
               }else{ 
                  this.resultados = data["abogados"];
                  console.log("Datos recibidos del Api Rest");
               }



            });

  }

  recuperar_contraseña(email:string){
    let url = URL_SERVICIOS + "operaciones/recuperar_email"; 

    return this.http.post( url, {email} )
    .map( resp=>{
      let data_resp = resp;
      console.log(data_resp);
      if( data_resp["status"]==false){
        this.alertCtrl.create({
          title:"Error al procesar la Operacion",
          subTitle : data_resp["error"],
          buttons:["Ok"]
        }).present();
      }else{
        
      }
    });
  }

  
}
