import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortDirection } from 'src/app/shared/directives/soratable.directive';
import { Staff } from '../table-modal/staff.modal';
import { SortStaffColumn } from 'src/app/shared/directives/soratablestaff.directive';

interface SearchResult {
  staffs: Staff[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortStaffColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(staffs: Staff[], column: SortStaffColumn, direction: string): Staff[] {
  if (direction === '' || column === '') {
    return staffs;
  } else {
    return [...staffs].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(staff: Staff, term: string, pipe: PipeTransform) {
  return staff.firstName.toLowerCase().includes(term.toLowerCase()) ||
         staff.email.toLowerCase().includes(term.toLowerCase()) ||
         staff.phone.toLowerCase().includes(term.toLowerCase()) ||
         staff.address.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class StaffService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _staffs$ = new BehaviorSubject<Staff[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _allstaffs:Staff[] = [];

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
      this._staffs$.next(result.staffs);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get staffs$() { return this._staffs$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  public setStaffs(staffs: Staff[]) { 
    this._allstaffs = staffs;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._staffs$.next(result.staffs);
      this._total$.next(result.total);
    });

    this._search$.next();
  }
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortStaffColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let staffs = sort(this._allstaffs, sortColumn, sortDirection);
    
    // 2. filter
    staffs = staffs.filter(staff => matches(staff, searchTerm, this.pipe));
    const total = staffs.length;
    
    // 3. paginate
    staffs = staffs.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    
    return of({staffs, total});
  }
}