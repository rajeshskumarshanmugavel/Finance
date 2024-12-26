
import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortRegistrationColumn } from 'src/app/shared/directives/soratableregistration.directive';
import { Master } from '../table-modal/master.modal';
import { SortDirection } from 'src/app/shared/directives/soratable.directive';
import { Registration } from '../table-modal/registration.modal';

interface SearchResult {
  registrations:  Registration[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortRegistrationColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(registrations: Registration[], column: SortRegistrationColumn, direction: string): Registration[] {
  if (direction === '' || column === '') {
    return registrations;
  } else {
    return [...registrations].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(registration: Registration, term: string, pipe: PipeTransform) {
  return registration.companyType.toLowerCase().includes(term.toLowerCase()) ||
          registration.regNumber.toLowerCase().includes(term.toLowerCase()) ||
          registration.companyName.toLowerCase().includes(term.toLowerCase()) ||
          registration.vatNumber.toLowerCase().includes(term.toLowerCase()) ||
          registration.address.toLowerCase().includes(term.toLowerCase())||
          registration.postcode.toLowerCase().includes(term.toLowerCase())||
          registration.mobile.toLowerCase().includes(term.toLowerCase()) ||
          registration.firstName.toLowerCase().includes(term.toLowerCase()) ||
          registration.lastName.toLowerCase().includes(term.toLowerCase()) ||
          registration.email.toLowerCase().includes(term.toLowerCase()) ||
          registration.landline.toLowerCase().includes(term.toLowerCase()) ||
          registration.is_Approved.toLowerCase().includes(term.toLowerCase());
          
}

@Injectable({providedIn: 'root'})
export class RegistrationService {
  setRegistrations(registrations: Registration[]) {
    throw new Error('Method not implemented.');
  }
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _registrations$ = new BehaviorSubject<Registration[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _allregistrations: Registration[] = [];

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
      this._registrations$.next(result.registrations);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get registrations$() { return this._registrations$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  public setregistrations(registrations: Registration[]) { 
    this._allregistrations = registrations;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._registrations$.next(result.registrations);
      this._total$.next(result.total);
    });

    this._search$.next();
  }
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortRegistrationColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

   // 1. sort
    let registrations = sort(this._allregistrations, sortColumn, sortDirection);
    
   // 2. filter
   registrations = registrations.filter(registration=> matches(registration, searchTerm, this.pipe));
    const total = registrations.length;
    
    //3. paginate
    registrations = registrations.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    
    return of({registrations, total});
  }
 }




