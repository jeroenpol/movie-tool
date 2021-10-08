import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { Movie, MovieInformation } from '../app.types';
import { OmdbApiService } from '../services/omdb-api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
	animations: [
		trigger('expandMoreInfo', [
			state('true', style({
				height: '*',
			})),
			state('false', style({
				height: '0px',
			})),
			transition('false <=> true', [
				animate(300),
			])
		])
	]
})
export class MovieComponent {

	@Input() movie: Movie;

	public movieInfo: MovieInformation;
	public expanded = false;

  constructor(private omdbApiService: OmdbApiService) { }

	public getMoreInfo(id: string): void {
		if (!this.movieInfo) {
			this.omdbApiService.searchById(id).pipe(
				take(1),
				tap((info) => {
					this.movieInfo = info;
					this.expanded = true;
				})
			).subscribe();
		} else {
			this.expanded = true;
		}
	}

	public hideInfo(): void {
		this.expanded = false;
	}

}
