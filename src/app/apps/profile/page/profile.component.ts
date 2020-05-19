import { ToastrService } from 'ngx-toastr';
import { Profile, ProfileDetail } from './../state/profile.model';
import { ProfileService } from './../state/profile.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, AfterViewChecked {
    public isSelected = false;

    public isProfilesLoading$: BehaviorSubject<boolean>;
    public isProfileDetailLoading$: BehaviorSubject<boolean>;
    public isUpdatingProfile$: BehaviorSubject<boolean>;

    public profiles$: Observable<Array<Profile>>;
    public profileDetail$: Observable<ProfileDetail>;

    constructor(private profileService: ProfileService,
                private toastr: ToastrService,
                private cdr: ChangeDetectorRef) {
        this.isUpdatingProfile$ = this.profileService.isUpdatingProfile$;
        this.isProfilesLoading$ = this.profileService.isProfileLoading$;
        this.isProfileDetailLoading$ = this.profileService.isProfileDetailLoading$;
    }

    ngOnInit() {
        this.profiles$ = this.profileService.getProfiles();
    }

    ngAfterViewChecked() {
        this.cdr.markForCheck();
    }

    public profileSelected(id: number): void {
        this.profileDetail$ = this.profileService.getProfile(id);
        this.isSelected = true;
    }

    public saveChanges(profile: ProfileDetail): void {
        this.profileService.updateProfile(profile)
            .subscribe(
                () => this.toastr.success('The profile has been updated successfully', 'Update'),
                err => this.toastr.error(`Failed to update the profile. Error: ${err.message}`, 'Error'));
    }
}