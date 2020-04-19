import { Component } from '@angular/core';
import { Platform,MenuController,AlertController,ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from '../providers/usuario/usuario';

// Paginas
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AbogadosPage } from '../pages/abogados/abogados';
import { PerfilPage } from '../pages/perfil/perfil';
import { SubcategoriasPage } from '../pages/subcategorias/subcategorias';
import { LeyesPage } from '../pages/leyes/leyes';
import { SalirPage } from '../pages/salir/salir';
import { TerminosPage } from '../pages/terminos/terminos';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  loginpage = LoginPage;
  homepage = HomePage;
  abogados = AbogadosPage;
  perfil = PerfilPage;
  subcategoria = SubcategoriasPage;
  leyes = LeyesPage;
  salir = SalirPage;
  terminospage = TerminosPage;
  activo:boolean;
  rootPage:any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private _us:UsuarioProvider,
              private menuCtrl : MenuController,
              public alertCtrl : AlertController,
              public modalCtrl: ModalController){

    platform.ready().then(() => {

       if( this._us.usuario_activo() ){
        this.rootPage=HomePage;
        console.log("Tenemos un usuario en linea");
        this.activo = true;
      }else{
        this.rootPage=LoginPage;
        console.log("No Tenemos un usuario en linea");
        this.activo = false;
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage( pagina:any){
      this.rootPage = pagina;
      this.menuCtrl.close();
  }

  cerrar(){
    this._us.cerrar_sesion();
    this.rootPage = this.loginpage;
    this.menuCtrl.close();
  }

  mostrar(){
    const modal = this.modalCtrl.create( TerminosPage);
    modal.present();
  }

  info(){
    this.presentConfirm();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Contacto',
      message: 'Cualquier duda o comentario escribenos a contacto@abogadosenred.com.ar',
      buttons: [
        {
          text: 'Gracias',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }



}
