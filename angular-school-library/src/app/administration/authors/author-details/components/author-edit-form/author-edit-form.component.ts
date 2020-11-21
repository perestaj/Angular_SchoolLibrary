import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IAuthor } from 'src/app/shared/models/author.model';

@Component({
  selector: 'app-author-edit-form',
  templateUrl: 'author-edit-form.component.html',
  styleUrls: ['author-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorEditFormComponent implements OnInit {
  @Input() author: IAuthor;

  @Output() saveAuthor = new EventEmitter<IAuthor>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() redirectToAuthorsList = new EventEmitter<void>();

  public get firstName(): AbstractControl {
    return this.authorEditForm.get('firstName');
  }

  public get lastName(): AbstractControl {
    return this.authorEditForm.get('lastName');
  }

  public get additionalInformation(): AbstractControl {
    return this.authorEditForm.get('additionalInformation');
  }

  public authorEditForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  public ngOnInit(): void {
    this.authorEditForm = this._fb.group({
      authorID: [this.author.authorID],
      firstName: [this.author.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.author.lastName, [Validators.required, Validators.maxLength(50)]],
      additionalInformation: [this.author.additionalInformation, Validators.maxLength(1000)]
    });
  }

  public save() {
    for (const field in this.authorEditForm.controls) {
      const control = this.authorEditForm.get(field);
      control.markAsTouched( {onlySelf: true } );
    }

    if (this.authorEditForm.valid) {
      this.saveAuthor.emit(this.authorEditForm.value);
    }
  }
}
