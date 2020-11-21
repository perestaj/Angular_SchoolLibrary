import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAuthor } from 'src/app/shared/models/author.model';

@Component({
  selector: 'app-author-details-form',
  templateUrl: 'author-details-form.component.html',
  styleUrls: ['author-details-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorDetailsFormComponent implements OnInit {

  @Input() author: IAuthor;

  @Output() edit = new EventEmitter<void>();
  @Output() redirectToAuthorsList = new EventEmitter<void>();

  public authorDetailsForm: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    this.authorDetailsForm = new FormGroup({});
  }
}
