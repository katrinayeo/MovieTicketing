import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { LandingPage } from '../landing/landing';

import { CustomerProvider } from '../../providers/customer/customer';

import { Customer } from '../../entities/customer';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  displayMessage: string;
  errorMessage: string;
  submitted: boolean;
  isLogin: boolean;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  customer: Customer;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public customerProvider: CustomerProvider) {
    this.submitted = false;
    this.isLogin = false;
    this.customer = null;
    this.displayMessage = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    if (sessionStorage.getItem("isLogin") === "true") {
      this.isLogin = true;
    }

    this.firstName = sessionStorage.getItem("firstName")
    this.lastName = sessionStorage.getItem("lastName")
  }

  clear() {
    this.username = "";
    this.password = "";
  }

  login(loginForm: NgForm) {
    this.submitted = true;
    if (loginForm.valid) {
      this.customerProvider.doLogin(this.username, this.password).subscribe(
        response => {
          if (response.status != false) {
            this.customer = response.customerEntity;
            //complete log in and send to profile page for now
            sessionStorage.setItem("customer", response.customerEntity);
            sessionStorage.setItem("firstName", response.customerEntity.firstName);
            sessionStorage.setItem("lastName", response.customerEntity.lastName);
            sessionStorage.setItem("username", response.customerEntity.username);
            console.log(sessionStorage.getItem("username"));
            sessionStorage.setItem("password", response.customerEntity.password);
            sessionStorage.setItem("email", response.customerEntity.email);
            sessionStorage.setItem("customerId", response.customerEntity.customerId);
            sessionStorage.setItem("isLogin", "true");
            //check whether there has been new requests which has not yet been opened
            console.log("**********CustomerId: " + sessionStorage.getItem("customerId") + "**********")

          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Invalid Login Credentials',
              subTitle: 'Please ensure Username/Password is Valid',
              buttons: ['Dismiss']
            });
            alert.present();
            this.username = "";
            this.password = "";
          }
        },
        error => {
          let alert = this.alertCtrl.create({
            title: 'Invalid Login Credentials',
            subTitle: 'Please ensure Username/Password is Valid',
            buttons: ['Dismiss']
          });
          alert.present();
          this.username = "";
          this.password = "";
          // this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Invalid Login Credentials',
        subTitle: 'Please ensure Username/Password is Valid',
        buttons: ['Dismiss']
      });
      alert.present();
      this.username = "";
      this.password = "";
    }
  }
}
