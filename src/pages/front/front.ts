import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

import * as $ from "jquery";


@IonicPage()
@Component({
  selector: 'page-front',
  templateUrl: 'front.html',
})
export class FrontPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    if (sessionStorage.getItem("isLogin") === "true") {
      console.log("There is a user logged in and his username is " + sessionStorage.getItem("username"));
    }
    else {
      console.log("No user is currently logged in.");
    }
    // $(document).ready(function () {
    //   var imageFile = ["homebackground.jpg"];
    //   var currentIndex = 0;
    //   setInterval(function () {
    //     if (currentIndex == imageFile.length) {
    //       currentIndex = 0;
    //     }
    //     $(".slides").css('background-image', 'url("/images/homebackground.jpg")');
    //   }, 3000);
    // });
  }

  doLogin() {
    this.navCtrl.push(LoginPage);
  }
  doSignup() {
    this.navCtrl.push(SignupPage);
  }

}
