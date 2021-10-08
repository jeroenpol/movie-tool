import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, tap } from 'rxjs/operators';
import { Movie, MovieInformation } from '../app.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

	private key = 'e28d18f7';
	private url = 'https://www.omdbapi.com/'

	constructor(
		private http: HttpClient,
	) {}

  public searchByTitle(title: String): Observable<Movie[]> {
		const parsedTitle = title.replace(' ', '+');
		const requestUrl = `${this.url}?apikey=${this.key}&s=${parsedTitle}&type=movie`;
	
		return this.http.get(requestUrl).pipe(
			filter((res) => res['Response'] === "True"),
			map((result) => {
				console.log(result);
				return this.formatMovies(result['Search']);
			})
		);
	}

	searchById(id: string): Observable<MovieInformation> {
		const requestUrl = `${this.url}?apikey=${this.key}&i=${id}&type=movie`;

		return this.http.get(requestUrl).pipe(
			filter((res) => res['Response'] === 'True'),
			tap((res) => console.log(res)),
			map((res) => this.formatMovieInformation(res))
		)
	}

	private formatMovies(movies: any[]): Movie[] {
		return movies.map((movie) => {
			return {
				id: movie['imdbID'],
				title: movie['Title'],
				year: movie['Year'],
				poster: movie['Poster'],
				link: this.getImdbLink(movie['imdbID']),
			}
		})
	}

	private formatMovieInformation(movie: any): MovieInformation {
		return {
			actors: movie['Actors'],
			plot: movie['Plot'],
			rating: movie['Metascore']
		}
	}

	private getImdbLink(id: string): string {
		return `https://www.imdb.com/title/${id}`
	}
}
