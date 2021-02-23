import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import firebase from "firebase/app";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "Mon Agence Immobilière";
  isLoggedIn: boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

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
    )
  }

  onSignOut() {
    this.authenticationService.signOutUser();
  }

}
