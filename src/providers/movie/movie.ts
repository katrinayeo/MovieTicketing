import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MovieProvider {

  ipAddress = '192.168.137.1';
  portNo = '8080';
  fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/GoldClassOnline-war/Resources/movie';

  baseUrl = "/api/movie";

  constructor(private httpClient: HttpClient,
  private platform:Platform) {
    console.log('Hello MovieProvider Provider');
  }

  getMovies(): Observable<any> {

    let path: string = '';

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }
    return this.httpClient.get<any>(path + "/retrieveAllMovies").pipe
      (
      catchError(this.handleError)
      );
  }

  getMovieByMovieId(movieId: number): Observable<any> {
		let path: string = '';

		if(this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}

		return this.httpClient.get<any>(path + "/retrieveMovie/" + movieId).pipe
		(
			catchError(this.handleError)
		);
	}

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
