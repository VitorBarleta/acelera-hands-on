import { ToastrService } from 'ngx-toastr';
import { EntityService } from '@common/services/entity.service';
import { ProfileQuery } from './profile.query';
import { ProfileStore } from './profile.store';
import { Profile } from './profile.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, switchMap, finalize } from 'rxjs/operators';
import { SetEntities } from '@datorama/akita/lib/setEntities';
import { ServiceConfig } from '@common/decorators/service-config';

@Injectable()
@ServiceConfig('profiles')
export class ProfileService extends EntityService<Profile> {
    constructor(
        private profileStore: ProfileStore,
        private profileQuery: ProfileQuery,
        httpClient: HttpClient,
        toastrService: ToastrService) {
            super(httpClient, toastrService);
        }

    public getProfiles(): Observable<SetEntities<Profile>> {
        this.profileStore.setLoading(true);
        return this.getAll()
            .pipe(
                tap(profiles => this.profileStore.set(profiles)),
                catchError(err => {
                    this.profileStore.setError(err);
                    return throwError(err);
                }),
                finalize(() => this.profileStore.setLoading()));
    }

    public activateProfile(id: number): Observable<SetEntities<Profile>> {
        return this.profileQuery
            .selectHasCache()
            .pipe(
                switchMap(hasCache => hasCache ? of([]) : this.getProfiles()),
                tap(() => {
                    this.profileStore.setActive(id);
                    this.profileStore.toggleSidepanel(true);
                }));
    }

    public closeSidepanel(): void {
        this.profileStore.toggleSidepanel();
    }

    public updateProfile(profile: Profile): Observable<Profile> {
        this.profileStore.setUpdating(true);
        return this.put(profile).pipe(
            tap(() => this.profileStore.update(profile.id, profile)),
            catchError(err => {
                this.profileStore.setError(err);
                return throwError(err);
            }),
            finalize(() => {
                this.profileStore.setUpdating();
                this.profileStore.toggleSidepanel();
            }));
    }
}
