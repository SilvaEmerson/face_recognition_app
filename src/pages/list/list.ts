import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AddImagePage } from "../add-image/add-image";
import { ImageListPage } from "../image-list/image-list";

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  private home = HomePage;
  private addImage = AddImagePage;
  private imageList = ImageListPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
