import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-image-list',
  templateUrl: 'image-list.html',
})
export class ImageListPage {
  private getListNamesResponse;
  private deleteImageResponse;
  private checkList: object = {};
  private getListNamesUrl: string = "https://face-recognition-lica.herokuapp.com/images";
  private deleteImageUrl: string = "https://face-recognition-lica.herokuapp.com/delete_image/";

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private http: HttpClient) {}

  deletePerson(filename){
      this.http.delete(this.deleteImageUrl+filename)
      .subscribe(res => {
          this.displayErrorAlert(res[0].response + " " + filename);
      }, err => {
          this.displayErrorAlert(err.message);
      });
  }


  deleteSelectedPersons(){
      let personsToDelete = this.getListNamesResponse.filter(key => this.checkList[key]);

      personsToDelete.forEach(person => {
          this.deletePerson(person);
      });

      this.getImageList();
  }

  toChekListObject(imageList){
    imageList.forEach(element => {
      return this.checkList[element] = false;
    });
  }


  getImageList() {
    let loading = this.loadingCtrl.create({
        content: "Keep calm, waiting a response..."
      });
    loading.present();

    this.http.get(this.getListNamesUrl)
      .subscribe(res => {
        this.getListNamesResponse = res[0].filenames;
        this.toChekListObject(this.getListNamesResponse);
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
