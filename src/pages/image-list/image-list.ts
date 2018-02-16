import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-image-list',
  templateUrl: 'image-list.html',
})
export class ImageListPage {
  private response;
  private url: string = "https://face-recognition-lica.herokuapp.com/image";

  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private http: HttpClient) { }

  getImageList() {
    this.http.get(this.url)
      .subscribe(res => {
        this.response = res;
      }, err => {
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
