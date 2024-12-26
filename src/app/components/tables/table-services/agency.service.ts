import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortColumn, SortDirection } from 'src/app/shared/directives/soratable.directive';
import { Agency } from '../table-modal/agency.modal';

interface SearchResult {
  agencies: Agency[];
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

function sort(agencies: Agency[], column: SortColumn, direction: string): Agency[] {
  if (direction === '' || column === '') {
    return agencies;
  } else {
    return [...agencies].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(agency: Agency, term: string, pipe: PipeTransform) {
  return agency.firstName.toLowerCase().includes(term.toLowerCase()) ||
         agency.email.toLowerCase().includes(term.toLowerCase()) ||
         agency.phone.toLowerCase().includes(term.toLowerCase()) ||
         agency.company.toLowerCase().includes(term.toLowerCase()) ||
         agency.address.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class AgencyService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _agencies$ = new BehaviorSubject<Agency[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _allagencies:Agency[] = [];

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
      this._agencies$.next(result.agencies);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get agencies$() { return this._agencies$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  public setAgencies(agencies: Agency[]) { 
    this._allagencies = agencies;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._agencies$.next(result.agencies);
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
    let agencies = sort(this._allagencies, sortColumn, sortDirection);
    
    // 2. filter
    agencies = agencies.filter(agency => matches(agency, searchTerm, this.pipe));
    const total = agencies.length;
    
    // 3. paginate
    agencies = agencies.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    
    return of({agencies, total});
  }
}