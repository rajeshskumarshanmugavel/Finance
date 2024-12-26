import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortMasterColumn } from 'src/app/shared/directives/soratablemaster.directive';
import { Master } from '../table-modal/master.modal';
import { SortDirection } from 'src/app/shared/directives/soratable.directive';

interface SearchResult {
  masters: Master[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortMasterColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(masters: Master[], column: SortMasterColumn, direction: string): Master[] {
  if (direction === '' || column === '') {
    return masters;
  } else {
    return [...masters].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(master: Master, term: string, pipe: PipeTransform) {
  return master.Name.toLowerCase().includes(term.toLowerCase()) ;//||
        //  customer.email.toLowerCase().includes(term.toLowerCase()) ||
        //  customer.phone.toLowerCase().includes(term.toLowerCase()) ||
        //  customer.company.toLowerCase().includes(term.toLowerCase()) ||
        //  customer.address.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class MasterService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _masters$ = new BehaviorSubject<Master[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _allmasters:Master[] = [];

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
      this._masters$.next(result.masters);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get masters$() { return this._masters$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  public setmasters(masters: Master[]) { 
    this._allmasters = masters;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._masters$.next(result.masters);
      this._total$.next(result.total);
    });

    this._search$.next();
  }
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortMasterColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

   // 1. sort
    let masters = sort(this._allmasters, sortColumn, sortDirection);
    
   // 2. filter
    masters = masters.filter(master=> matches(master, searchTerm, this.pipe));
    const total = masters.length;
    
    //3. paginate
    masters = masters.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    
    return of({masters, total});
  }
 }