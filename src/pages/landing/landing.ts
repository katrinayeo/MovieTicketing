import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular';
import { Movie } from '../../entities/Movie';
import { MovieProvider } from '../../providers/movie/movie';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { MocksProvider } from '../../providers/mocks/mocks';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-landing',
	templateUrl: 'landing.html',
})

export class LandingPage {
	genre: string[];
	language: string[];
	rating: string[];
	errorMessage: string;
	movies: Movie[];
	searchItems: any;
	searchTerm: string = '';
	searchControl: FormControl;

	constructor(public navCtrl: NavController, public navParams: NavParams, public movieProvider: MovieProvider) {
		this.rating = ['G','PG', 'PG13', 'NC16', 'M18', 'R21'];
		this.language = ['English', 'French', 'Thai'];
		this.genre = ['Comedy', 'Horror', 'Romance', 'Action', 'Thriller'];
		this.searchControl = new FormControl();
		console.log(sessionStorage.getItem("username"));
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LandingPage');
		this.movieProvider.getMovies().subscribe(
			response => {
				this.movies = response.movies;
			},
			error => {
				this.errorMessage = "HTTP" + error.status + ": " + error.error.message;
			}
		);
		this.searchControl.valueChanges.debounceTime(300).subscribe(search => {

			this.setFilteredItems();

		});
	}

	ionViewWillEnter() {
		console.log('ionViewWillLoad LandingPage');
		this.movieProvider.getMovies().subscribe(
			response => {
				this.movies = response.movies;
			},
			error => {
				this.errorMessage = "HTTP" + error.status + ": " + error.error.message;
			}
		);
		this.searchControl.valueChanges.debounceTime(300).subscribe(search => {

			this.setFilteredItems();

		});
		if(this.movies != null) {
			this.scrambleArray(this.movies);
		}
	}

	ionViewWillLeave() {
	}

	viewItem(movieId) {
		this.navCtrl.push(ItemPage, { 'movieToViewId': movieId });
	}

	filterItems(searchTerm) {
		return this.movies.filter((movie) => {
			return movie.movieTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
		});
	}

	setFilteredItems() {
		this.searchItems = this.filterItems(this.searchTerm);
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
}
