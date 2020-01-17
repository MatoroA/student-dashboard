import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
// import * app from 'firebase';
import { tap } from 'rxjs/operators';
// var firebase = require('firebase');

// var _message = app.messaging();
// _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
// _messaging.onMessage = _messaging.onMessage.bind(_message);






@Injectable({
  providedIn: 'root'
})
export class FCMService {

  constructor() { 

  }

  getPermission(){
    // return this.afMessaging.requestToken.pipe(
    //     tap( token =>{
    //         console.log(token)
    //       })
    // );
}

}
  