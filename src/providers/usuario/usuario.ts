import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AlertController,Platform } from 'ionic-angular';
import { URL_SERVICIOS } from '../../config/urlservicios';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { IniciarPage } from '../../pages/iniciar/iniciar';
import 'rxjs/add/operator/map';


@Injectable()
export class UsuarioProvider {

	token:string;
	email:string;
  id_cliente:string="";
  calificacionprom:any;

	constructor(public http: HttpClient, 
              	private alertCtrl : AlertController,
              	private platform : Platform,
              	private storage: Storage) {
		console.log('Servicio de Usuario');
		this.cargar_storage();
	}

	usuario_activo():boolean{
    
    if(this.token){
      return true;
    }else{
      return false;
    }

  }

  ingresar( email:string, password:string){

    let url = URL_SERVICIOS + "/login";

    return this.http.post( url, {email,password} )
                    .map( resp=>{

                        let data_resp = resp;
                        console.log(data_resp);

                        if( data_resp["error"]){
                          this.alertCtrl.create({
                            title:"Error al Iniciar",
                            subTitle : data_resp["mensaje"],
                            buttons:["Ok"]
                          }).present();
                        }else{
                          this.token = data_resp["token"];
                          this.id_cliente = data_resp["id_cliente"];
                          this.guardar_storage();
                          
                        }
                    });
  }

  cerrar_sesion(){
    this.token = null;
    this.id_cliente = null;

    // Guardar en el Storage
    this.guardar_storage();

  }

  private guardar_storage(){
    if( this.platform.is("cordova")){
      // Device
      this.storage.set('token',this.token);
      this.storage.set('id_cliente',this.id_cliente);
      //this.storage.set('email',this.email);
    }else{
      // Desktop
      if(this.token){
        localStorage.setItem("token",this.token);
        localStorage.setItem("id_cliente",this.id_cliente);
        //localStorage.setItem("email",this.email);
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("id_cliente");
        // localStorage.removeItem("email");
      }
      
    }
  }

  cargar_storage(){
    let promesa = new Promise( (resolve,reject) =>{
        if(this.platform.is("cordova")){
          // Device
          this.storage.ready()
                      .then( ()=>{
                          this.storage.get("token")
                                      .then( token=>{
                                          if( token ){
                                            this.token = token;
                                          }
                                      })

                          this.storage.get("id_cliente")
                          .then( id_cliente=>{
                              if( id_cliente ){
                                this.id_cliente = id_cliente;
                              }
                              resolve();
                          })
                      })
        }else{
          // Desktop
          if(localStorage.getItem("token")){
            this.token = localStorage.getItem("token");
            this.email = localStorage.getItem("id_cliente");
          }
          resolve();
        }
    });
    return promesa;
  }

  registrar(email:string, password:string, nombre:string, telefono:string, dni?:string,direccion?:string ){

    let url = URL_SERVICIOS + "register";

    return this.http.post( url, {email,password,nombre,direccion,telefono,dni} )
                    .map( resp=>{

                        let data_resp = resp;
                        console.log(data_resp);

                        if( data_resp["error"]){
                          this.alertCtrl.create({
                            title:"Error al Iniciar",
                            subTitle : data_resp["mensaje"],
                            buttons:["Ok"]
                          }).present();
                        }else{
                          this.token = data_resp["token"];
                          this.id_cliente = data_resp["id_cliente"];
                          //this.email = data_resp["email"];

                          // Guardar en el Storage.
                          //this.guardar_storage();
                          
                        }
                    });

  }

  enviar_consulta(id_cliente:string,id_abogado:string,valoracion:number){

      let url = URL_SERVICIOS + "operaciones";

    return this.http.post( url, {id_cliente,id_abogado,valoracion} )
                    .map( resp=>{

                        let data_resp = resp;
                        console.log(data_resp);

                        if( data_resp["error"]){
                          this.alertCtrl.create({
                            title:"Error al mandar la consulta",
                            subTitle : data_resp["mensaje"],
                            buttons:["Ok"]
                          }).present();
                        }else{
                          this.alertCtrl.create({
                            title:"Gracias por Asignar tu calificación",
                            subTitle : "Abogados en Red.",
                            buttons:["Ok"]
                          }).present();
                          
                        }
                    });

  }

  calificacion(id_abogado:number)
  {
      console.log("Entro al provider de calificacion");
      console.log('id_abogado: ' + id_abogado);

     let url = URL_SERVICIOS + "operaciones/calificacion"; 

      return this.http.post( url, {id_abogado} )
                    .map( resp=>{
                      console.log("ENTRO A LA FUNCION POST");
                        let data_resp = resp;
                        console.log("Respues: " + data_resp);
                        if( data_resp["error"]){
                          this.alertCtrl.create({
                            title:"Error al recibir la calificacion",
                            subTitle : data_resp["error"],
                            buttons:["Ok"]
                          }).present();
                        }else{
                          this.calificacionprom = data_resp["promedio"];
                          console.log("Promedio provider: "+ this.calificacion);
                        }
                    });
  }

}
