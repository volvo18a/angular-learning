import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

import {
	debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
  	this.searchTerms.next(term);
  }

  ngOnInit(): void {
  	this.heroes$ = this.searchTerms.pipe(
  	  //延迟300ms，使请求的最小间隔定为300ms
  	  debounceTime(300),
  	  //name重复不会请求
  	  distinctUntilChanged(),
  	  //为前两者都通过的name调用search
  	  switchMap((term: string) => 
  	  	this.heroService.searchHeroes(term)),
  	);
  }

}
