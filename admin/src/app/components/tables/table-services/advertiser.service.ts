import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortColumn, SortDirection } from 'src/app/shared/directives/soratable.directive';
import { Advertiser } from '../table-modal/advertiser.modal';

interface SearchResult {
  advertisers: Advertiser[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(advertisers: Advertiser[], column: SortColumn, direction: string): Advertiser[] {
  if (direction === '' || column === '') {
    return advertisers;
  } else {
    return [...advertisers].sort((a, b) => {
      //const res = compare(a[column], b[column]);
      const res = compare(a[column] as string | number, b[column] as string | number);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(advertiser: Advertiser, term: string, pipe: PipeTransform) {
  return advertiser.companyType.toLowerCase().includes(term.toLowerCase()) ||
        advertiser.regNumber.toLowerCase().includes(term.toLowerCase()) ||
        advertiser.companyName.toLowerCase().includes(term.toLowerCase()) ||
        advertiser.vatNumber.toLowerCase().includes(term.toLowerCase()) ||
        advertiser.address.toLowerCase().includes(term.toLowerCase()) ||
        advertiser.postcode.toLowerCase().includes(term.toLowerCase()) ||
        advertiser.mobile.toLowerCase().includes(term.toLowerCase()) ||
        advertiser.firstName.toLowerCase().includes(term.toLowerCase()) ||
        advertiser.lastName.toLowerCase().includes(term.toLowerCase()) ||
        advertiser.email.toLowerCase().includes(term.toLowerCase()) ||
        advertiser.landline.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class AdvertiserService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _advertisers$ = new BehaviorSubject<Advertiser[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _alladvertisers:Advertiser[] = [];

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
      this._advertisers$.next(result.advertisers);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get advertisers$() { return this._advertisers$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  public setAdvertisers(advertisers: Advertiser[]) { 
    this._alladvertisers = advertisers;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._advertisers$.next(result.advertisers);
      this._total$.next(result.total);
    });

    this._search$.next();
  }
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let advertisers = sort(this._alladvertisers, sortColumn, sortDirection);
    
    // 2. filter
    advertisers = advertisers.filter(advertiser => matches(advertiser, searchTerm, this.pipe));
    const total = advertisers.length;
    
    // 3. paginate
    advertisers = advertisers.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    
    return of({advertisers, total});
  }
}