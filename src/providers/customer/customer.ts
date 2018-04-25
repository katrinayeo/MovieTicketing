import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Platform } from 'ionic-angular';

import { CustomerEntity } from '../../entities/customer';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerProvider {

  ipAddress = '192.168.137.1';
  portNo = '8080';
  fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/GoldClassOnline-war/Resources/Customer';

  baseUrl = "/api/Customer";

  customerId = "";
  firstName = "";
  lastName = "";
  username = "";
  password = "";
  email = "";

  loginCredential = "";

  constructor(public platform: Platform,
		private httpClient: HttpClient) {
	}

  //doLogin
  doLogin(username: string, password: string): Observable<any> {
    let path: string = '';

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }

    return this.httpClient.get<any>(path + "/doLogin/" + username + "/" + password).pipe
      (
      catchError(this.handleError)
      );
  }

  //retrieve by ID
  getCustomer(username: string): Observable<any> {
    let path: string = '';

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }

    return this.httpClient.get<any>(path + "/retrieveCustomer/" + username).pipe
      (
      catchError(this.handleError)
      );
  }

  //Sign up
	signUp(newCustomer: CustomerEntity): Observable<any> {
		console.log("CALLING SIGNUP FUNCTION");
		let path: string = '';

		if (this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}
		console.log("I MADE IT THROUGH TO THE SIGNUP FUNCTION");
		let newCustomerReq = {
			"customerEntity": newCustomer
		};
		console.log("MADE IT PAST NEW CUSTOMER REQ ")
		return this.httpClient.put<any>(path, newCustomerReq, httpOptions).pipe
			(
			catchError(this.handleError)
			);
	}

  //error handling
	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('An unknown error has occurred:', error.error.message);
		}
		else {
			console.error(" A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`);
		}
		return new ErrorObservable(error);
	}

}
