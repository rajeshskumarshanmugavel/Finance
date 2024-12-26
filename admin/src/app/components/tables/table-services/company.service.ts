import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortColumn, SortDirection } from 'src/app/shared/directives/soratable.directive';
import { Company } from '../table-modal/company.modal';

interface SearchResult {
  companyes: Company[];
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

function sort(company: Company[], column: SortColumn, direction: string): Company[] {
  if (direction === '' || column === '') {
    return company;
  } else {
    return [...company].sort((a, b) => {
      //const res = compare(a[column], b[column]);
      const res = compare(a[column] as string | number, b[column] as string | number);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(company: Company, term: string, pipe: PipeTransform) {
  return company.companyType.toLowerCase().includes(term.toLowerCase()) ||
  company.regNumber.toLowerCase().includes(term.toLowerCase()) ||
  company.companyName.toLowerCase().includes(term.toLowerCase()) ||
  company.vatNumber.toLowerCase().includes(term.toLowerCase()) ||
  company.address.toLowerCase().includes(term.toLowerCase()) ||
  company.postcode.toLowerCase().includes(term.toLowerCase()) ||
  company.mobile.toLowerCase().includes(term.toLowerCase()) ||
  company.firstName.toLowerCase().includes(term.toLowerCase()) ||
  company.lastName.toLowerCase().includes(term.toLowerCase()) ||
  company.email.toLowerCase().includes(term.toLowerCase()) ||
  company.landline.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class CompanyService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _companyes$ = new BehaviorSubject<Company[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _allcompanyes:Company[] = [];

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
      this._companyes$.next(result.companyes);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get companyes$() { return this._companyes$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  public setcompanyes(companyes: Company[]) { 
    this._allcompanyes = companyes;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._companyes$.next(result.companyes);
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
    let companyes = sort(this._allcompanyes, sortColumn, sortDirection);
    
    // 2. filter
    companyes = companyes.filter(agency => matches(agency, searchTerm, this.pipe));
    const total = companyes.length;
    
    // 3. paginate
    companyes = companyes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    
    return of({companyes, total});
  }
}