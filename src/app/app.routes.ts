import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { StarshipComponent } from './components/starship/starship.component';

export const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'movies',
		component: MoviesComponent
	},
	{
		path: 'starships',
		component: StarshipComponent
	}
];
