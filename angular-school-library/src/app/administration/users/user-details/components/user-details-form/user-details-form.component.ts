import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IUser } from '../../../models/user.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-details-form',
  templateUrl: 'user-details-form.component.html',
  styleUrls: ['user-details-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsFormComponent implements OnInit {

  @Input() user: IUser;

  @Output() edit = new EventEmitter<void>();
  @Output() redirectToUsersList = new EventEmitter<void>();

  public userDetailsForm: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    this.userDetailsForm = new FormGroup({});
  }
}
