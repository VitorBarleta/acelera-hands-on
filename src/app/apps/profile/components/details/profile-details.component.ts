import { ProfileDetail } from './../../state/profile.model';
import { Component, Output, EventEmitter, ChangeDetectionStrategy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDetailsComponent implements AfterViewChecked {
    @Output() save: EventEmitter<ProfileDetail> = new EventEmitter();
    public updating: boolean;

    public profileForm: FormGroup;

    get profilePicture() { return this.profileForm.controls.profilePicture }
    get name() { return this.profileForm.controls.name }
    get lastName() { return this.profileForm.controls.lastName }

    constructor(private cdr: ChangeDetectorRef) {
        this.createProfileForm();
    }

    ngAfterViewChecked() {
        this.cdr.markForCheck();
    }

    public createProfileForm(): void {
        this.profileForm = new FormBuilder().group({
            id: [],
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            profilePicture: [''],
            city: ['', Validators.required],
            state: [Validators.required],
            company: [Validators.required],
            position: [Validators.required],
            description: [Validators.required]
        });
    }

    public patchFormValue(profile: ProfileDetail): void {
        this.profileForm.patchValue(profile);
    }

    public saveChanges(): void {
        this.profileForm.updateValueAndValidity();
        if (this.profileForm.valid)
            this.save.emit(this.profileForm.getRawValue());
    }
}