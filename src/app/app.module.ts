import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Paginas
import { HomePage } from '../pages/home/home';
import { SubcategoriasPage } from '../pages/subcategorias/subcategorias';
import { AbogadosPage } from '../pages/abogados/abogados';
import { LoginPage } from '../pages/login/login';
import { IniciarPage } from '../pages/iniciar/iniciar';
import { RegistrarPage } from '../pages/registrar/registrar';
import { PerfilPage } from '../pages/perfil/perfil';
import { LeyesPage } from '../pages/leyes/leyes';
import { SalirPage } from '../pages/salir/salir';
import { ContactoPage } from '../pages/contacto/contacto';
import { TerminosPage } from '../pages/terminos/terminos';
import { PdfPage } from '../pages/pdf/pdf';
import { BrowserTab } from '@ionic-native/browser-tab';


// Provider
import { BuscadorProvider } from '../providers/buscador/buscador';

// Herramientas
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { UsuarioProvider } from '../providers/usuario/usuario';

// Plugins
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubcategoriasPage,
    AbogadosPage,
    LoginPage,
    IniciarPage,
    RegistrarPage,
    PerfilPage,
    LeyesPage,
    SalirPage,
    ContactoPage,
    TerminosPage,
    PdfPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Atras'
    }),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    PdfViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubcategoriasPage,
    AbogadosPage,
    LoginPage,
     IniciarPage,
    RegistrarPage,
    PerfilPage,
    LeyesPage,
    SalirPage,
    ContactoPage,
    TerminosPage,
    PdfPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BuscadorProvider,
    UsuarioProvider,
    UniqueDeviceID,
    BrowserTab
  ]
})
export class AppModule {}
