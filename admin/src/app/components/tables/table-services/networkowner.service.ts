import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortColumn, SortDirection } from 'src/app/shared/directives/soratable.directive';
import { NetworkOwner } from '../table-modal/networkowner.modal';

interface SearchResult {
  networkowners: NetworkOwner[];
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

function sort(networkowners: NetworkOwner[], column: SortColumn, direction: string): NetworkOwner[] {
  if (direction === '' || column === '') {
    return networkowners;
  } else {
    return [...networkowners].sort((a, b) => {
      //const res = compare(a[column], b[column]);
      const res = compare(a[column] as string | number, b[column] as string | number);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(networkowner: NetworkOwner, term: string, pipe: PipeTransform) {
  return networkowner.companyType.toLowerCase().includes(term.toLowerCase()) ||
  networkowner.regNumber.toLowerCase().includes(term.toLowerCase()) ||
  networkowner.companyName.toLowerCase().includes(term.toLowerCase()) ||
  networkowner.vatNumber.toLowerCase().includes(term.toLowerCase()) ||
  networkowner.address.toLowerCase().includes(term.toLowerCase()) ||
  networkowner.postcode.toLowerCase().includes(term.toLowerCase()) ||
  networkowner.mobile.toLowerCase().includes(term.toLowerCase()) ||
  networkowner.firstName.toLowerCase().includes(term.toLowerCase()) ||
  networkowner.lastName.toLowerCase().includes(term.toLowerCase()) ||
  networkowner.email.toLowerCase().includes(term.toLowerCase()) ||
  networkowner.landline.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class NetworkOwnerService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _networkowners$ = new BehaviorSubject<NetworkOwner[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _allnetworkowners:NetworkOwner[] = [];

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
      this._networkowners$.next(result.networkowners);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get networkowners$() { return this._networkowners$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  public setNetworkOwners(networkowners: NetworkOwner[]) { 
    this._allnetworkowners = networkowners;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._networkowners$.next(result.networkowners);
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
    let networkowners = sort(this._allnetworkowners, sortColumn, sortDirection);
    
    // 2. filter
    networkowners = networkowners.filter(networkowner => matches(networkowner, searchTerm, this.pipe));
    const total = networkowners.length;
    
    // 3. paginate
    networkowners = networkowners.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    
    return of({networkowners, total});
  }
}