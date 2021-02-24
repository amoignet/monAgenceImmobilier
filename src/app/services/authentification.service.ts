import { Injectable } from '@angular/core';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor() { }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
            resolve(data);
          }
        ).catch(
          (error) => {
            reject(error)
          }
        )
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

  // signUpUser(email: string, password: string) {
  //   return new Promise(
  //     (resolve, reject) => {
  //       firebase.auth().createUserWithEmailAndPassword(email, password).then(
  //         () => {
  //           resolve(console.log('connecté'));
  //         }
  //       ).catch(
  //         (error) => {
  //           reject(error)
  //         }
  //       )
  //     }
  //   );
  // }

}
