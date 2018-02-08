import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {

  constructor(
  	private http: HttpClient,
  	private messageService: MessageService
  ) { }

  private log(message: string) {
  	this.messageService.add('HeroService: ' + message);
  }

  private heroesUrl = 'api/heroes'

  // getHeroes(): Observable<Hero[]> {	//get heroes with RXJS
  // 	this.messageService.add("HeroService: fetched heroes");
  // 	return of(HEROES);
  // }

  private handleError<T> (operation = 'operation', result?: T){
  	return (error: any): Observable<T> => {
  	  // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
  	}
  }

  getHeroes(): Observable<Hero[]> {
  	this.messageService.add("HeroService: fetched heroes");
  	return this.http.get<Hero[]>(this.heroesUrl).pipe(
  	  tap(heroes => this.log(`fetched heroes`)),
  	  catchError(this.handleError('getHeroes', []))
  	);
  }

  // getHero(id: number): Observable<Hero> {
  // 	this.messageService.add(`HeroService: fetched hero id=${id}`);
  // 	return of(HEROES.find(hero => hero.id === id));
  // }

  getHero(id: number): Observable<Hero> {
  	const url = `${this.heroesUrl}/${id}`;
  	return this.http.get<Hero>(url).pipe(
  	  tap(_ => this.log(`fetched hero id=${id}`)),
  	  catchError(this.handleError<Hero>(`getHero id=${id}`))
  	);
  }

  searchHeroes (term:string): Observable<Hero[]> {
  	if (!term.trim()) {
  		//if not search term, return empty hero array.
  		return of([]);
  	}

  	return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`).pipe(
  	  tap(_ => this.log(`found heroes matching "${term}"`)),
  	  catchError(this.handleError('searchHeroes', []))
  	);
  }

  addHero (hero: Hero): Observable<any> {
  	return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
  	  tap((hero: Hero) => this.log(`add hero w/ id=${hero.id}`)),
  	  catchError(this.handleError<Hero>('addHero'))
  	);
  }

  updateHero (hero: Hero): Observable<any> {
  	return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
	  tap(_ => this.log(`updated hero id=${hero.id}`)),
  	  catchError(this.handleError<any>(`updateHero`))
  	);
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
  	const id = typeof hero === 'number' ? hero : hero.id;
  	const url = `${this.heroesUrl}/${id}`;

  	return this.http.delete<Hero>(url, httpOptions).pipe(
  	  tap(_ => this.log(`delete hero id=${id}`)),
  	  catchError(this.handleError<Hero>('deleteHero'))
  	);
  }
}
