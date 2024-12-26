import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortColumn, SortDirection } from 'src/app/shared/directives/soratable.directive';
import { Register } from '../table-modal/register.modal';
import { SortRegisterColumn } from 'src/app/shared/directives/sortableregister.directive';

interface SearchResult {
  registers: Register[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortRegisterColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(registers: Register[], column: SortRegisterColumn, direction: string): Register[] {
  if (direction === '' || column === '') {
    return registers;
  } else {
    return [...registers].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(register: Register, term: string, pipe: PipeTransform) {
  return register.firstName.toLowerCase().includes(term.toLowerCase()) ||
         register.lastName.toLowerCase().includes(term.toLowerCase()) ||
         register.userType.toLowerCase().includes(term.toLowerCase()) ||
         register.companyName.toLowerCase().includes(term.toLowerCase()) ||
         register.regNumber.toLowerCase().includes(term.toLowerCase()) ||
         register.vatNumber.toLowerCase().includes(term.toLowerCase()) ||
         register.email.toLowerCase().includes(term.toLowerCase()) ||
         register.landline.toLowerCase().includes(term.toLowerCase()) ||
         register.mobile.toLowerCase().includes(term.toLowerCase()) ||
         register.address.toLowerCase().includes(term.toLowerCase()) ||
         register.postcode.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class RegisterService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _registers$ = new BehaviorSubject<Register[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _allregisters:Register[] = [];

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
      this._registers$.next(result.registers);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get registers$() { return this._registers$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  public setRegisters(registers: Register[]) { 
    this._allregisters = registers;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._registers$.next(result.registers);
      this._total$.next(result.total);
    });

    this._search$.next();
  }
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortRegisterColumn(sortColumn: SortRegisterColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let registers= sort(this._allregisters, sortColumn, sortDirection);
    
    // 2. filter
    registers = registers.filter(register => matches(register, searchTerm, this.pipe));
    const total = registers.length;
    
    // 3. paginate
    registers = registers.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    
    return of({registers, total});
  }
}