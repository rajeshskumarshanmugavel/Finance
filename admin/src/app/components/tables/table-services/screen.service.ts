import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortScreenColumn } from 'src/app/shared/directives/soratablescreen.directive';
import { SortDirection } from 'src/app/shared/directives/soratable.directive';
import { Screen } from '../table-modal/screen.modal';

interface SearchResult {
    screens: Screen[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortScreenColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(screens: Screen[], column: SortScreenColumn, direction: string): Screen[] {
  if (direction === '' || column === '') {
   return screens;
  } else {
    return [...screens].sort((a, b) => {
     const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
  return screens;
}

function matches(screen: Screen, term: string, pipe: PipeTransform) {
 
  return screen.screenName.toLowerCase().includes(term.toLowerCase()) ||
  screen.screenId.toLowerCase().includes(term.toLowerCase()) ||
  screen.NoScreenId.toLowerCase().includes(term.toLowerCase()) ||
  screen.location.toLowerCase().includes(term.toLowerCase()) ||
  screen.resWidth.toString().toLowerCase().includes(term.toLowerCase()) ||
  screen.resHeight.toString().toLowerCase().includes(term.toLowerCase()) ||
  screen.width.toString().toLowerCase().includes(term.toLowerCase()) ||
  screen.height.toString().toLowerCase().includes(term.toLowerCase()) ||
  screen.loop.toString().toLowerCase().includes(term.toLowerCase()) ||
  screen.NoOFscreens.toString().toLowerCase().includes(term.toLowerCase()) ||
  screen.latitude.toString().toLowerCase().includes(term.toLowerCase()) ||
  screen.longitude.toString().toLowerCase().includes(term.toLowerCase()) ||
  screen.mediaType.toLowerCase().includes(term.toLowerCase()) ||
  screen.environment.toLowerCase().includes(term.toLowerCase()) ||
  screen.sector.toLowerCase().includes(term.toLowerCase()) ||
  screen.imagePaths.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class ScreenService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _screens$ = new BehaviorSubject<Screen[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _allscreens:Screen[] = [];

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._screens$.next(result.screens);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get screens$() { return this._screens$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  public setScreens(screens: Screen[]) { 
    this._allscreens = screens;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._screens$.next(result.screens);
      this._total$.next(result.total);
    });

    this._search$.next();
  }
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  
  set sortColumn(sortColumn: SortScreenColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let screens = sort(this._allscreens, sortColumn, sortDirection);
    
    // 2. filter
    screens = screens.filter(screen => matches(screen, searchTerm, this.pipe));
    const total = screens.length;
    
    // 3. paginate
    screens = screens.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    
    return of({screens, total});
  }
}