import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private url: string = "https://face-cognition.herokuapp.com/";
  private image: any;
  private response: any;

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public alertCtrl: AlertController,
              public camera: Camera,
              public domSanitizer: DomSanitizer,
              public file: File,
              public transfer: FileTransfer) {}

  private fileTransfer: FileTransferObject = this.transfer.create();

  getPerson() {

    let options: FileUploadOptions = {
      fileKey: 'file'
    }

    this.fileTransfer.upload(this.image, this.url, options)
        .then(res => {
          this.response = res.response;
        }, err => {
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

    this.camera.getPicture(options).then((imageData) => {
      // this.image = 'data:image/jpeg;base64,' + imageData;
      this.image = imageData;
    }, (err) => {
      this.displayErrorAlert(err.message);
    });
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

    this.camera.getPicture(options).then((imageData) => {
      // this.image = 'data:image/jpeg;base64,' + imageData;
      this.image = imageData.split("?", 1)[0];
      this.image
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
