import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IBook } from '../../../models/book.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-details-form',
  templateUrl: 'book-details-form.component.html',
  styleUrls: ['book-details-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsFormComponent implements OnInit {
  @Input() book: IBook;
  @Input() showEditButton: boolean;

  @Output() edit = new EventEmitter<void>();
  @Output() redirectToBooksList = new EventEmitter<void>();

  public bookDetailsForm: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    this.bookDetailsForm = new FormGroup({});
  }
}
