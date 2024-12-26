
import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { Agency } from 'src/app/components/tables/table-modal/agency.modal';
import { Customer } from 'src/app/components/tables/table-modal/customer.modal';
import { NetworkOwner } from 'src/app/components/tables/table-modal/networkowner.modal';
import { Register } from 'src/app/components/tables/table-modal/register.modal';

// export type SortColumn = keyof Customer | keyof Agency | keyof NetworkOwner | '';
export type SortRegisterColumn = keyof Register | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortRegisterColumn;
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

  @Input() sortable: SortRegisterColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}