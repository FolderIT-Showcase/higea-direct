import {Component, OnInit} from '@angular/core';

declare const FB: any;

@Component({
  selector: 'app-facebook-signin',
  templateUrl: './facebook-signin.component.html',
  styleUrls: ['./facebook-signin.component.scss']
})
export class FacebookSigninComponent implements OnInit {

  constructor() {
    FB.init({
      appId: '285797451868355',
      cookie: false,  // enable cookies to allow the server to access
      // the session
      xfbml: true,  // parse social plugins on this page
      version: 'v2.8' // use graph api version 2.5
    });
  }

  onFacebookLoginClick() {
    FB.login();
  }

  statusChangeCallback(resp) {
    if (resp.status === 'connected') {
      // connect here with your server for facebook login by passing access token given by facebook
    } else if (resp.status === 'not_authorized') {

    } else {

    }
  };

  ngOnInit() {
    FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  }

}
