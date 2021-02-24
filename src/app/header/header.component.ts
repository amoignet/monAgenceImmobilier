import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import firebase from "firebase/app";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "Mon Agence Immobilière";
  isLoggedIn: boolean = false;

  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (userSession) => {
        console.log(userSession)
        if(userSession) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    );
  }

  onSignOut() {
    this.authentificationService.signOutUser();
  }

}
