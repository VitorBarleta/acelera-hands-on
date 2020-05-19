import { ProfileDetailsComponent } from './../components/details/profile-details.component';
import { ToastrService } from 'ngx-toastr';
import { Profile, ProfileDetail } from './../state/profile.model';
import { ProfileService } from './../state/profile.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, AfterViewChecked, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, AfterViewChecked, AfterViewInit {

    @ViewChild(ProfileDetailsComponent)
    public profileDetailsComponent: ProfileDetailsComponent;

    public isSelected = false;

    public isProfilesLoading$: Subject<boolean>;
    public isProfileDetailLoading$: Subject<boolean>;

    public profiles$: Observable<Array<Profile>>;

    constructor(private profileService: ProfileService,
        private toastr: ToastrService,
        private cdr: ChangeDetectorRef) {
        this.isProfilesLoading$ = this.profileService.isProfileLoading$;
        this.isProfileDetailLoading$ = this.profileService.isProfileDetailLoading$;
    }

    ngOnInit() {
        this.profiles$ = this.profileService.getProfiles();
    }

    ngAfterViewChecked() {
        this.cdr.markForCheck();
    }

    ngAfterViewInit() {
        this.profileService.isUpdatingProfile$.subscribe(updating =>
            this.profileDetailsComponent.updating = updating);
    }

    public profileSelected(id: number): void {
        this.profileService.getProfile(id).subscribe(profile =>
            this.profileDetailsComponent.patchFormValue(profile));
        this.isSelected = true;
    }

    public saveChanges(profile: ProfileDetail): void {
        this.profileService.updateProfile(profile)
            .subscribe(
                () => this.toastr.success('The profile has been updated successfully', 'Update'),
                err => this.toastr.error(`Failed to update the profile. Error: ${err.message}`, 'Error'));
    }
}