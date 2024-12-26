
import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { Registration} from 'src/app/components/tables/table-modal/registration.modal';
import { SortDirection } from './soratable.directive';

export type SortRegistrationColumn = keyof Registration | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortRegistrationEvent {
  column: SortRegistrationColumn;
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

  @Input() sortable: SortRegistrationColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortRegistrationEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}