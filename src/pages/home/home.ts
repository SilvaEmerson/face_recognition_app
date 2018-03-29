import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { LoadingController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { CameraMethodsProvider } from "../../providers/camera-methods/camera-methods";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private image: any;
  private response: any;
  private unknowPersonsNumber: number;
  private url: string = "https://face-recognition-lica.herokuapp.com/upload_image";

  constructor(private alertCtrl: AlertController,
              private camera: Camera,
              private domSanitizer: DomSanitizer,
              private transfer: FileTransfer,
              private loadingCtrl: LoadingController,
              private cameraMethods: CameraMethodsProvider) {}

  private fileTransfer: FileTransferObject = this.transfer.create();


  getPerson() {

    this.unknowPersonsNumber = 0;
    this.response = [];

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

          this.response = JSON.parse(res.response);

          this.response = this.response[0].response;

          if(typeof this.response == 'string'){
              if (this.response.includes("An error")){
                  this.displayErrorAlert(this.response);
              }else{
                  this.response = [this.response];
              }
          }

          this.response.forEach(val => {
              if(val == 'Unknow person'){
                  this.unknowPersonsNumber += 1;
              }
          });

          this.response = this.response.filter( value => {
            return value != 'Unknow person'
          });

          let lengthBefore = this.response.length;

          this.response = this.response.filter( (value, index, array) => {
            return array.indexOf(value) == index;
          });

          this.unknowPersonsNumber += lengthBefore - this.response.length;

        }, err => {
          loading.dismiss();
          this.displayErrorAlert(err.message);
        })
  }


  private onTakePicture = this.cameraMethods.onTakePicture(this.getPerson);

  private onChooseImageFromGallery = this.cameraMethods.onChooseImageFromGallery(this.getPerson)


  displayErrorAlert(error) {

    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: error,
      buttons: ['OK']
    });

    alert.present();
  }

}
