import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Films } from '../interface/films.interface';

@Injectable({
	providedIn: 'root',
})
export class SwapiService {
	private baseUrl = 'https://swapi.info/api';

	constructor(private http: HttpClient) {}

	getFilms(): Observable<Films | any> {
		return this.http.get(`${this.baseUrl}/films`);
	}
}
