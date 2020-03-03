import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = {
    isUserAuthenticated: false
  }
  constructor( public afAuth: AngularFireAuth) { }

  
  async signIn(email: string, password: string) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user=>{
      return user.user.getIdTokenResult().then(userToken=>{
        let access: boolean = false;
        if(userToken.claims == null){
          access = false;
        } else if(userToken.claims.admin){
          access = true;
          this.user.isUserAuthenticated = true;
        }
        return access;
        
      })
    }, () =>{
      // return error;
      return false;
      
    });
  }

  signOut(){
    return new Promise((resolve, reject) => {
      if(this.afAuth.auth.currentUser){
        this.afAuth.auth.signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  isUserAuthenticated(): boolean{
    return this.user.isUserAuthenticated;
  }
}
 