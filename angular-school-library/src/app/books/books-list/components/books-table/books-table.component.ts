import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IBook } from '../../../models/book.model';

import * as statuses from '../../../../shared/models/book-statuses';
import { BookSortColumns } from '../../../models/book-sort-columns';

@Component({
  selector: 'app-books-table',
  templateUrl: 'books-table.component.html',
  styleUrls: ['books-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksTableComponent {
  @Input() books: IBook[];
  @Input() sortColumn: string;
  @Input() showRequestBook: boolean;
  @Input() showDeleteButton: boolean;

  @Output() sortBooksList = new EventEmitter<string>();
  @Output() requestBook = new EventEmitter<number>();
  @Output() deleteBook = new EventEmitter<number>();

  public bookStatuses = statuses.BookStatuses;
  public bookSortColumns = BookSortColumns;

  constructor() { }
}
