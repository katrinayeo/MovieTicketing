import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, AbstractControl, FormGroup, Validators, NgForm } from '@angular/forms';

import * as $ from "jquery";
import { CustomerProvider } from '../../providers/customer/customer';

import { Customer } from '../../entities/customer';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  errorMessage: string;
  infoMessage: string;
  newCustomer: Customer;
  submitted: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public customerProvider: CustomerProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    this.submitted = false;
    this.newCustomer = new Customer();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }



  signUp(signUpForm: NgForm) {
    if (signUpForm.valid) {
      console.log("valid");
      this.customerProvider.signUp(this.newCustomer).subscribe(
        response => {
          console.log("hello");
          if (response.customerEntity != null) {
            this.newCustomer = response.customerEntity;
            console.log(this.newCustomer);
            //complete log in and send to profile page for now
            sessionStorage.setItem("firstName", response.customerEntity.firstName);
            sessionStorage.setItem("lastName", response.customerEntity.lastName);
            sessionStorage.setItem("username", response.customerEntity.username);
            sessionStorage.setItem("password", response.customerEntity.password);
            sessionStorage.setItem("email", response.customerEntity.email);
            sessionStorage.setItem("customerId", response.customerEntity.customerId);
            sessionStorage.setItem("isLogin", "true");
            //push to new page
            this.navCtrl.push(TabsPage);
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Invalid Login Credentials',
              subTitle: 'Please ensure Username/Password is Valid',
              buttons: ['Dismiss']
            });
            alert.present();
          }
        },
        error => {
          let alert = this.alertCtrl.create({
            title: 'Invalid Login Credentials',
            subTitle: 'Please ensure Username/Password is Valid',
            buttons: ['Dismiss']
          });
          alert.present();
          // this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Invalid credentials',
        subTitle: 'Please ensure you have filled up details accurately',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }
}
