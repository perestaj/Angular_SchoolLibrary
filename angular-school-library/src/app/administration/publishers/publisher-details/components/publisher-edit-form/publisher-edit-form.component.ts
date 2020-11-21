import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IPublisher } from '../../../../../shared/models/publisher.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-publisher-edit-form',
  templateUrl: 'publisher-edit-form.component.html',
  styleUrls: ['publisher-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublisherEditFormComponent implements OnInit {
  @Input() publisher: IPublisher;

  @Output() savePublisher = new EventEmitter<IPublisher>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() redirectToPublishersList = new EventEmitter<void>();

  public publisherEditForm: FormGroup;

  public get name(): AbstractControl {
    return this.publisherEditForm.get('name');
  }

  public get address(): AbstractControl {
    return this.publisherEditForm.get('address');
  }

  public get additionalInformation(): AbstractControl {
    return this.publisherEditForm.get('additionalInformation');
  }

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.publisherEditForm = this.formBuilder.group({
      publisherID: [this.publisher.publisherID],
      name: [this.publisher.name, [Validators.required, Validators.maxLength(50)]],
      address: [this.publisher.address, [Validators.required, Validators.maxLength(200)]],
      additionalInformation: [this.publisher.additionalInformation, Validators.maxLength(1000)]
    });
  }

  public save(): void {
    for (const field in this.publisherEditForm.controls) {
      const control = this.publisherEditForm.get(field);
      control.markAsTouched( {onlySelf: true } );
    }

    if (this.publisherEditForm.valid) {
      this.savePublisher.emit(this.publisherEditForm.value);
    }
  }
}
