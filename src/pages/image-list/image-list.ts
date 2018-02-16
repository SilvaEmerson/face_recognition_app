import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-image-list',
  templateUrl: 'image-list.html',
})
export class ImageListPage {
  private response;
  private url: string = "https://face-recognition-lica.herokuapp.com/images";

  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private http: HttpClient) { }

  getImageList() {
    let loading = this.loadingCtrl.create({
      content: "Keep calm, waiting response..."
    });

    loading.present();

    this.http.get(this.url)
      .subscribe(res => {
        this.response = res[0].filanames;
        loading.dismiss();
      }, err => {
        this.displayErrorAlert(err.message);
        loading.dismiss();
      });
  }

  ionViewDidEnter(){
    this.getImageList()
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
