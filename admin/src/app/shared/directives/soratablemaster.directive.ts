
import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { Master } from 'src/app/components/tables/table-modal/master.modal';
import { SortDirection } from './soratable.directive';

export type SortMasterColumn = keyof Master | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortMasterEvent {
  column: SortMasterColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableMasterHeader {

  @Input() sortable: SortMasterColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortMasterEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}