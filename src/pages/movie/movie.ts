import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { Movie } from '../../entities/movie';



/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-movie',
	templateUrl: 'movie.html',
})
export class MoviePage {
	errorMessage: string;
	infoMessage: string;
	movieToViewId: number;
	movieToView: Movie;
	movies: Movie[];
	slideData: string[];
	customerId: number;
	checkCustId: number;


	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public movieProvider: MovieProvider,
		) {
		this.movieToView = null;
		this.movieToViewId = navParams.get('movieToViewId');
		this.checkCustId = +sessionStorage.getItem("customerId");
		this.slideData = [];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MoviePage');
		console.log(this.movieToViewId);
		console.log("Customer ID (CHECK)" + this.checkCustId)
		this.movieProvider.getMovieByMovieId(this.movieToViewId).subscribe(
			response => {
				this.movieToView = response.movie;
				if (this.movieToView.images[0] == "./images/noimage.png") {
					this.slideData.push("assets/imgs/noimage.png");
					console.log(this.slideData);
				}
				else {
					this.slideData = this.movieToView.images;
				}
				this.customerId = response.movie.customerEntity.customerId;
				console.log("Customer ID (CustomerId)" + this.customerId)
			},
			error => {
				this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
			}
		);

		this.movieProvider.getMovies().subscribe(
			response => {
				this.movies = response.movies;
				this.scrambleArray(this.movies);
			},
			error => {
				this.errorMessage = "HTTP" + error.status + ": " + error.error.message;
			}
		);

	}

	ionViewWillEnter() {
		// console.log('ionViewWillEnter ItemPage');
		// this.feedbackProvider.getFeedbacksByRevieweeId(this.customerId).subscribe(
		// 	response => {
		// 		this.feedbacks = response.feedbacks;
		// 	},
		// 	error => {
		// 		this.errorMessage = "HTTP" + error.status + ": " + error.error.message;
		// 	}
		// );
	}

	ionViewWillLeave() {
		this.movieToView = null;
		this.movieToViewId = null;
		this.checkCustId = null;
		this.slideData = [];
	}

	scrambleArray(array) {
		return new Promise(resolve => {
			let length = array.length, j, i;
			while (length) {
				i = Math.floor(Math.random() * length--);
				j = array[length];
				array[length] = array[i];
				array[i] = j;
			}
			resolve(true);
		});
	}

	viewItem(movieId) {
		this.navCtrl.push(MoviePage, { 'movieToViewId': movieId });
	}
	

	popView() {
		this.navCtrl.pop();
	}

}
