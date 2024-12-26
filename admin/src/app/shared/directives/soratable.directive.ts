
import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { Company} from 'src/app/components/tables/table-modal/company.modal';
import { Advertiser } from 'src/app/components/tables/table-modal/advertiser.modal';
import { NetworkOwner } from 'src/app/components/tables/table-modal/networkowner.modal';

export type SortColumn = keyof Advertiser | keyof Company | keyof NetworkOwner | '';
//export type SortColumn = keyof Advertiser | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumn;
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
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}