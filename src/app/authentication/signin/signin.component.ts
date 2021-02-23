import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm() {
    this.signinForm = this.formBuilder.group({
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(6)] ]
    });
  }

  onSubmitSigninForm() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

  //   this.authenticationService.signUpUser(email, password).then(
  //     () => {
  //       console.log('OK');
  //     }
  //   ).catch(
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  this.authenticationService.signInUser(email, password).then(
    () => {
      this.router.navigate(['/admin', 'dashboard']);
    }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
