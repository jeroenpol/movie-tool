import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Movie } from './app.types';
import { OmdbApiService } from './services/omdb-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

	public searchForm = this.formBuilder.group({
		query: ''
	})
	public results$: Observable<Movie[]>

	constructor(
		private formBuilder: FormBuilder,
		private omdbApiService: OmdbApiService,
	) {}

	public searchMovie(): void {
		const query = this.searchForm.get('query').value;

		this.results$ = query
			? this.omdbApiService.searchByTitle(query)
			: null;
	}
}
