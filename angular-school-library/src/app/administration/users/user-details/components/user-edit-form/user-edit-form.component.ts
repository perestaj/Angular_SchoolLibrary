import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IUser } from '../../../models/user.model';
import { IUserRole } from '../../../models/user-role.model';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { IUserUpdateResult } from '../../../models/user-update-result.model';

function passwordCompare(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const passwordConfirmControl = c.get('passwordConfirm');

  if (passwordControl.value === passwordConfirmControl.value) {
      return null;
  }
  return { 'confirm': true };
}

function idValidator(c: AbstractControl): { [key: string]: boolean } | null {
  return c.value > 0 ? null : { 'id': true };
}

function requiredPasswordValidator(userID: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (userID === 0) {
      return !!c.value && c.value.length > 0 ? null : { 'required': true};
    }

    return null;
  };
}

@Component({
  selector: 'app-user-edit-form',
  templateUrl: 'user-edit-form.component.html',
  styleUrls: ['user-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditFormComponent implements OnInit {
  @Input() user: IUser;
  @Input() roles: IUserRole[];
  @Input() userUpdateResult: IUserUpdateResult;

  @Output() saveUser = new EventEmitter<IUser>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() redirectToUsersList = new EventEmitter<void>();

  public userEditForm: FormGroup;

  public get userName(): AbstractControl {
    return this.userEditForm.get('userName');
  }

  public get password(): AbstractControl {
    return this.userEditForm.get('passwordGroup.password');
  }

  public get passwordConfirm(): AbstractControl {
    return this.userEditForm.get('passwordGroup.passwordConfirm');
  }

  public get firstName(): AbstractControl {
    return this.userEditForm.get('firstName');
  }

  public get lastName(): AbstractControl {
    return this.userEditForm.get('lastName');
  }

  public get email(): AbstractControl {
    return this.userEditForm.get('email');
  }

  public get address(): AbstractControl {
    return this.userEditForm.get('address');
  }

  public get role(): AbstractControl {
    return this.userEditForm.get('role');
  }

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.userEditForm = this.formBuilder.group({
      userID: [this.user.userID],
      userName: [this.user.userName, [Validators.required, Validators.maxLength(50)]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.maxLength(128), requiredPasswordValidator(this.user.userID)]],
        passwordConfirm: ['', [Validators.maxLength(128)]],
      }, { validator: passwordCompare }),
      firstName: [this.user.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.user.lastName, [Validators.required, Validators.maxLength(50)]],
      email: [this.user.email, [Validators.email, Validators.maxLength(100)]],
      address: [this.user.address, Validators.maxLength(200)],
      role: [+this.user.role, [Validators.required, idValidator]]
    });
  }

  public save(): void {
    for (const field in this.userEditForm.controls) {
      const control = this.userEditForm.get(field);
      control.markAsTouched( {onlySelf: true } );
    }

    this.userEditForm.get('passwordGroup.password').markAsTouched({ onlySelf: true });
    this.userEditForm.get('passwordGroup.passwordConfirm').markAsTouched({ onlySelf: true });

    if (this.userEditForm.valid) {
      const user: IUser = {
        password: this.userEditForm.value.passwordGroup.password,
        passwordConfirm: this.userEditForm.value.passwordGroup.passwordConfirm,
        ...this.userEditForm.value
      };

      this.saveUser.emit(user);
    }
  }
}
