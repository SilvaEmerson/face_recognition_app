import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraMethodsProvider {

  private image: string;

  constructor(private http: HttpClient,
              private alertCtrl: AlertController,
              private camera: Camera) {}

  onTakePicture(toExecute: Function) {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData.split("?", 1)[0];
      toExecute();
    }, (err) => {
      this.displayErrorAlert(err.message);
    });
  }

  onChooseImageFromGallery(toExecute: Function) {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData.split("?", 1)[0];
      toExecute();
    }, (err) => {
      this.displayErrorAlert(err.message);
    });
  }

  displayErrorAlert(error) {

    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: error,
      buttons: ['OK']
    });

    alert.present();
  }

}
