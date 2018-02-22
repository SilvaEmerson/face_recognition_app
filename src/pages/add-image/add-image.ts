import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { LoadingController } from "ionic-angular";

@Component({
  selector: 'page-add-image',
  templateUrl: 'add-image.html',
})
export class AddImagePage {

  private url: string = "https://face-recognition-lica.herokuapp.com/add_image";
  private image: any;
  private personName: string;
  private response: any;

  constructor(private alertCtrl: AlertController,
    private camera: Camera,
    private domSanitizer: DomSanitizer,
    private transfer: FileTransfer,
    private loadingCtrl: LoadingController) { }

  private fileTransfer: FileTransferObject = this.transfer.create();

  addPerson() {

    let options: FileUploadOptions = {
      fileKey: 'file'
    }

    if(this.personName.length != 0){
        options.fileName = this.personName + '.jpeg';
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
      this.displayPromptFile();
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

    this.response = null;
    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData.split("?", 1)[0];
      this.displayPromptFile();
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


  displayPromptFile() {

    let prompt = this.alertCtrl.create({
      title: 'Type the person name',
      inputs: [
        {
          name: 'person',
          placeholder: 'Person name'
        }
      ],
      buttons: [
        {
          text: 'Save',
          handler: data => {
              this.personName = data.person;
              console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

}
