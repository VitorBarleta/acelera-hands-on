import { filter, take, takeUntil, tap } from 'rxjs/operators';
import { ProfileQuery } from './../state/profile.query';
import { ToastrService } from 'ngx-toastr';
import { Profile } from './../state/profile.model';
import { ProfileService } from './../state/profile.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, AfterViewChecked, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TakeUntilDestroy } from 'common/decorators/take-until-destroy';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@TakeUntilDestroy
export class ProfileComponent implements OnInit, AfterViewChecked, OnDestroy {
    private componentDestroy: () => Observable<unknown>;

    public profilesLoading$: Observable<boolean>;
    public profileDetailLoading$: Observable<boolean>;
    public updatingProfile$: Observable<boolean>;
    public sidepanelOpened$: Observable<boolean>;

    public profiles$: Observable<Array<Profile>> = this.profileQuery.profiles$;
    public activeProfile$: Observable<Profile> = this.profileQuery.selectActive();

    constructor(
        private profileService: ProfileService,
        private profileQuery: ProfileQuery,
        private cdr: ChangeDetectorRef) {
        this.updatingProfile$ = this.profileQuery.updating$;
        this.profilesLoading$ = this.profileQuery.loading$;
        this.profileDetailLoading$ = this.profileQuery.detailsLoading$;
        this.sidepanelOpened$ = this.profileQuery.sidepanelOpened$;
    }

    ngOnDestroy(): void { }

    ngOnInit() {
        this.profileService.getProfiles()
            .pipe(takeUntil(this.componentDestroy()))
            .subscribe();
    }

    ngAfterViewChecked() {
        this.cdr.markForCheck();
    }

    public activateProfile(id: number): void {
        this.profileService.activateProfile(id).pipe(takeUntil(this.componentDestroy())).subscribe();
    }

    public deactivateProfile(): void {
        this.profileService.closeSidepanel();
    }

    public saveChanges(profile: Profile): void {
        this.profileService.updateProfile(profile)
            .pipe(takeUntil(this.componentDestroy()))
            .subscribe();
    }
}
