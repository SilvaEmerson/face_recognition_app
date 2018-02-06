import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { FileChooser } from "@ionic-native/file-chooser";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private url: string = "https://testfacecog.herokuapp.com/";
  private image: any;
  private response: any;
  private imgUrl: any;

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public alertCtrl: AlertController,
              public camera: Camera,
              public fileChooser: FileChooser,
              public domSanitizer: DomSanitizer) {}

  getPerson() {
    // let formData: FormData = new FormData();
    // formData.append("file", this.image);

    var formData = "file=" + this.image;

    this.displayErrorAlert(JSON.stringify({
      file: this.image
    }));

    this.http.post(this.url, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      responseType: "text"
    })
    .toPromise()
    .then(res => {
      this.displayErrorAlert(res);
      this.response = res;
    }, err => {
      this.displayErrorAlert(err.message);
    });
  }

  onTakePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
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
