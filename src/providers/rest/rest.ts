import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  url: string = 'https://face-cognition.herokuapp.com/';

  constructor(public http: HttpClient) {}

  getPerson(img){
    return new Promise( (resolve, reject) => {
      this.http.post(this.url, JSON.stringify({'file': img }))
        .subscribe( res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }
  
}
