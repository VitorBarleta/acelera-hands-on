import { Profile } from './../../state/profile.model';
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDetailsComponent implements OnChanges {
    @Output() save: EventEmitter<Profile> = new EventEmitter();

    @Input() profile: Profile;
    @Input() updating = false;

    public profileForm: FormGroup;

    get profilePicture() { return this.profileForm.controls.profilePicture }
    get name() { return this.profileForm.controls.name }
    get lastName() { return this.profileForm.controls.lastName }

    constructor() {
        this.createProfileForm();
    }

    ngOnChanges() {
        this.patchFormValue(this.profile);
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

    public patchFormValue(profile: Profile): void {
        this.profileForm.patchValue(profile);
    }

    public saveChanges(): void {
        this.profileForm.updateValueAndValidity();
        if (this.profileForm.valid)
            this.save.emit(this.profileForm.getRawValue());
    }
}