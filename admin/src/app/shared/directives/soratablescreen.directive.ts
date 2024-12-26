
import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { Screen} from 'src/app/components/tables/table-modal/screen.modal';
import { SortDirection } from './soratable.directive';

export type SortScreenColumn = keyof Screen | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortScreenEvent {
  column: SortScreenColumn;
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

export class NgbdSortableScreenHeader {

  @Input() sortable: SortScreenColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortScreenEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

export { SortDirection };
