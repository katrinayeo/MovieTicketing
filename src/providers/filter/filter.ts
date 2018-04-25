import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the FilterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilterProvider {
	
	result: any[];
	searchItems: any;

  constructor(public http: HttpClient) {
  }
  
  initializeFilter(list: any[]) {
	  this.searchItems = list;
  }
  
  filterItems(searchTerm: any) {
	this.searchItems = this.searchItems.filter((item) => {
		return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  });
}

}