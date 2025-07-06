import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { StarWarMovie } from '../../interface/starwarmovie.interface';
import { data } from '../../data/star_wars_movies';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi.service';

@Component({
	selector: 'app-movies',
	standalone: true,
	imports: [
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatFormFieldModule,
		MatInputModule,
		CommonModule,
	],
	templateUrl: './movies.component.html',
	styleUrl: './movies.component.css',
})
export class MoviesComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'title',
		'episode',
		'director',
		'release_date',
		'synopsis',
	];
	dataSource = new MatTableDataSource<StarWarMovie>(data);

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private swapiService: SwapiService) {}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.getFilms();
	}

	applyFilter(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.dataSource.filter = value.trim().toLowerCase();
	}

	getFilms() {
		this.swapiService.getFilms().subscribe((res) => {
			console.log(res);
		})
	}
}
