import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IBook } from '../../../models/book.model';
import { IAuthor } from '../../../../shared/models/author.model';
import { IPublisher } from '../../../../shared/models/publisher.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-book-edit-form',
  templateUrl: 'book-edit-form.component.html',
  styleUrls: ['book-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookEditFormComponent implements OnInit {
  @Input() book: IBook;
  @Input() authors: IAuthor[];
  @Input() publishers: IPublisher[];

  @Output() saveBook = new EventEmitter<IBook>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() redirectToBooksList = new EventEmitter<void>();

  public get title(): AbstractControl {
    return this.bookEditForm.get('title');
  }

  public get authorIds(): AbstractControl {
    return this.bookEditForm.get('authorIds');
  }

  public get publisherID(): AbstractControl {
    return this.bookEditForm.get('publisherID');
  }

  public get additionalInformation(): AbstractControl {
    return this.bookEditForm.get('additionalInformation');
  }

  public maxDate: Date;

  public bookEditForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.maxDate = new Date();
  }

  public ngOnInit(): void {
    this.bookEditForm = this.formBuilder.group({
      bookID: [this.book.bookID],
      title: [this.book.title, [Validators.required, Validators.maxLength(100)]],
      authorIds: [this.book.authorIds, Validators.required],
      publisherID: [this.book.publisherID, Validators.min(1)],
      additionalInformation: [this.book.additionalInformation, Validators.maxLength(1000)]
    });
  }

  public save(): void {
    for (const field in this.bookEditForm.controls) {
      const control = this.bookEditForm.get(field);
      control.markAsTouched( {onlySelf: true } );
    }

    if (this.bookEditForm.valid) {
      const book = { ...this.bookEditForm.value, publisherID: +this.bookEditForm.value.publisherID };
      this.saveBook.emit(book);
    }
  }
}
