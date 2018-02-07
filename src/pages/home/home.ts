import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { LoadingController } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private url: string = "https://face-cognition.herokuapp.com/";
  private image: any;
  private response: any;

  constructor(private alertCtrl: AlertController,
              private camera: Camera,
              private domSanitizer: DomSanitizer,
              private transfer: FileTransfer,
              private loadingCtrl: LoadingController) {}

  private fileTransfer: FileTransferObject = this.transfer.create();

  getPerson() {

    let options: FileUploadOptions = {
      fileKey: 'file'
    }
    let loading = this.loadingCtrl.create({
      content: "Keep calm, waiting response..."
    });
    
    loading.present();

    this.fileTransfer.upload(this.image, this.url, options)
        .then(res => {
          loading.dismiss();
          this.response = res.response;
        }, err => {
          loading.dismiss();
          this.displayErrorAlert(err.message);
        })
  }

  onTakePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: false,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
    }

    this.response = null;
    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData.split("?", 1)[0];
    }, (err) => {
      this.displayErrorAlert(err.message);
    });

    this.getPerson();
  }

  onChooseImageFromGallery() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }

    this.response = null;
    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData.split("?", 1)[0];
      this.getPerson();
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
