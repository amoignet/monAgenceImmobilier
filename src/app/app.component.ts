import { Component } from '@angular/core';
import firebase from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monAgence';

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyCcBhDDwz6-u8hUhoGL73RHRVVNWM6BaB0",
      authDomain: "monagence-7c9fb.firebaseapp.com",
      projectId: "monagence-7c9fb",
      storageBucket: "monagence-7c9fb.appspot.com",
      messagingSenderId: "782104202562",
      appId: "1:782104202562:web:9a1de97f3d04b8c42bccdb"
    };
    firebase.initializeApp(firebaseConfig);
  }

}
