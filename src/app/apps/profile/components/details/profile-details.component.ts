import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profile } from '@core/apps/profile/state/profile.model';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDetailsComponent {
    @Output() save: EventEmitter<Profile> = new EventEmitter();

    @Input() set profile(profile: Profile) {
        this.profileForm.patchValue(profile);
    };
    @Input() updating = false;

    public profileForm: FormGroup;

    get profilePicture() { return this.profileForm.controls.profilePicture }
    get name() { return this.profileForm.controls.name }
    get lastName() { return this.profileForm.controls.lastName }

    constructor() {
        this.createProfileForm();
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
        }, {
            updateOn: 'blur'
        });
    }

    public saveChanges(): void {
        this.profileForm.updateValueAndValidity();
        if (this.profileForm.valid)
            this.save.emit(this.profileForm.getRawValue());
    }
}