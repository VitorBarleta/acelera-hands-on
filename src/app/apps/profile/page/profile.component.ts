import { filter, tap } from 'rxjs/operators';
import { ProfileQuery } from './../state/profile.query';
import { ToastrService } from 'ngx-toastr';
import { Profile } from './../state/profile.model';
import { ProfileService } from './../state/profile.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, AfterViewChecked {
    public profilesLoading$: Observable<boolean>;
    public profileDetailLoading$: Observable<boolean>;
    public updatingProfile$: Observable<boolean>;
    public sidepanelOpened$: Observable<boolean>;

    public profiles$: Observable<Array<Profile>> = this.profileQuery.profiles$;
    public activeProfile$: Observable<Profile> = this.profileQuery.selectActive();

    constructor(
        private profileService: ProfileService,
        private profileQuery: ProfileQuery,
        private toastr: ToastrService,
        private cdr: ChangeDetectorRef) {
        this.updatingProfile$ = this.profileQuery.updating$;
        this.profilesLoading$ = this.profileQuery.loading$;
        this.profileDetailLoading$ = this.profileQuery.detailsLoading$;
        this.sidepanelOpened$ = this.profileQuery.sidepanelOpened$;
    }

    ngOnInit() {
        this.profileService.getProfiles().subscribe();
        this.subscribeToErrors();
    }

    ngAfterViewChecked() {
        this.cdr.markForCheck();
    }

    public activateProfile(id: number): void {
        this.profileService.activateProfile(id).subscribe();
    }

    public deactivateProfile(): void {
        this.profileService.closeSidepanel();
    }

    public saveChanges(profile: Profile): void {
        this.profileService.updateProfile(profile)
            .subscribe(
                () => this.toastr.success('The profile has been updated successfully', 'Update'));
    }

    public subscribeToErrors(): void {
        this.profileQuery.error$.pipe(
            filter(err => !!err),
            tap(err => this.toastr.error(err?.statusText))
        ).subscribe();
    }
}
