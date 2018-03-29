import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { MyApp } from './app.component';
import { ListPage } from "../pages/list/list";
import { HomePage } from "../pages/home/home";
import { AddImagePage } from "../pages/add-image/add-image"
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from "@angular/common/http";
import { ImageListPage } from "../pages/image-list/image-list";
import { CameraMethodsProvider } from "../providers/camera-methods/camera-methods";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddImagePage,
    ListPage,
    ImageListPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddImagePage,
    ListPage,
    ImageListPage,
  ],
  providers: [
    AlertController,
    StatusBar,
    FileTransfer,
    FileTransferObject,
    Camera,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraMethodsProvider,
  ]
})
export class AppModule {}
