import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

// Provider
import { BuscadorProvider } from "../../providers/buscador/buscador";

// Paginas
import {AbogadosPage} from "../../pages/abogados/abogados";

@Component({
    selector: 'page-subcategorias',
    templateUrl: 'subcategorias.html',
})
export class SubcategoriasPage {

    subcat:string = "";
    cat1:any = [];
    request:any = {};
    pageabogados = AbogadosPage;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        private _bs:BuscadorProvider,
        private alertCtrl:AlertController){

    }


    ionViewCanEnter(){
        this.subcat = this.navParams.get('categoria')
        console.log('Sub categoria: ' + this.subcat);

        // Select case sub categorias
        switch(this.subcat){
            case 'Familia':{
                this.cat1=['Divorcios','Tenencia','Filiacion','Adopcion','Alimentos','Violencia familiar'];
                break;
            }
            case 'Penal':{
                this.cat1=['Detenciones','Probation','Excarcelacion','Eximicion de prision','Abuso Sexual','Prostitucion','Declaracion indagatoria','Recurso de apelacion','Juicio oral'];
                break;
            }
            case 'Laboral':{
                this.cat1=['Despidos','Trabajo en negro','Indemnizacion','Accidentes de trabajo','Horas extras/aguinaldo','Convenios colectivos','Seclo'];
                break;
            }
            case 'Sucesion/Testamento':{
                this.cat1=['Sucesion/Testamento'];
                break;
            }
            case 'Daños y Perjuicios':{
                this.cat1=['Daño material','Daño moral','Daño Psicologico','Responsabilidad contractual','Accidentes'];
                break;
            }
            case 'Derecho Comercial':{
                this.cat1=['Sociedades','Cooperativas','Mutuales','Marcas y Patentes'];
                break;
            }
            case 'Accidentes de transito':{
                this.cat1=['Moto','Auto','Trenes','Peaton'];
                break;
            }
            case 'Edificios/Alquiler':{
                this.cat1=['Asesoramiento a Consorcistas','Propiedad y posecion','Contratos de propiedad','Expropiacion de tierras'];
                break;
            }
            case 'Jubilaciones y Pensiones':{
                this.cat1=['Anses','Pension por fallecimiento','Jubilacion ordinaria','Jubilacion por edad avanzada','Jubilacion por Regimenes Especiales','Calculos Previsionales'];
                break;
            }
            case 'Mala Praxis':{
                this.cat1=['Mala Praxis'];
                break;
            }
            case 'Defensa al consumidor':{
                this.cat1=['Negociaciones y acuerdos con consumidores','Actuaciones administrativas','Auditorias'];
                break;
            }
            case 'Mediacion':{
                this.cat1=['Asistencia y servicios de asesoría'];
                break;
            }
            case 'Contratos':{
                this.cat1=['Realizacion de cualquier tipo de contratos','Contrato de alquiler','Contrato de mutuo acuerdo'];
                break;
            }
        }
    }

    verabogados(termino:string){
        //Inicializar Loading
        let loading = this.loadingCtrl.create({
         content: 'Cargando datos de abogados...'
        });

        console.log("Termino: " + termino);

        this._bs.buscar_producto( termino );
        this.request = this._bs.resultados;

        if( this.request.length > 0 ){
            console.log(this.request);

        }else{
            console.log("Sin data");
            loading.present();
        }

        loading.dismiss();
        this.navCtrl.push(AbogadosPage,{
            'item' : this.request
        });
    }

}
