import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';

//import { RestProvider } from "../../providers/rest/rest";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  private image: string;
  private response: any;

  constructor(public navCtrl: NavController,
              //public restProvider: RestProvider,
              public http: HttpClient,
              public alertCtrl: AlertController,
              public camera: Camera,
              public domSanitizer: DomSanitizer) {}

  getPerson() {
    console.log(typeof this.image);

    let formData: FormData = new FormData();
    formData.append('file', this.image);

    this.http.post('https://face-cognition.herokuapp.com/', formData,
                  {responseType: "text"})
        .subscribe(res =>{
          this.response = res;
        }, err => {
          this.displayErrorAlert(err.message);
        });
    // this.restProvider.getPerson(this.image)
    //   .then(data => {
    //     console.log(data);
    //     this.response = data;
    //   })
    //   .catch(err => {
    //     this.displayErrorAlert(err.message)
    //   })
  }

  onTakePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.domSanitizer.bypassSecurityTrustUrl(imageData)['changingThisBreaksApplicationSecurity']);
    }, (err) => {
      this.displayErrorAlert(err.message);
    });
  }

  displayErrorAlert(error) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error,
      buttons: ['OK']
    });

    alert.present();
  }
}
