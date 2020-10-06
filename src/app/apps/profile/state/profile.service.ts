import { ProfileQuery } from './profile.query';
import { ProfileStore } from './profile.store';
import { Profile } from './profile.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, switchMap, finalize } from 'rxjs/operators';
import { SetEntities } from '@datorama/akita/src/setEntities';

@Injectable()
export class ProfileService {
    private readonly _baseUrl: string = 'http://localhost:3000/profiles';

    constructor(
        private httpClient: HttpClient,
        private profileStore: ProfileStore,
        private profileQuery: ProfileQuery) { }

    public getProfiles(): Observable<SetEntities<Profile>> {
        this.profileStore.setLoading(true);
        return this.httpClient
            .get<Array<Profile>>(this._baseUrl)
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
        return this.httpClient.put<Profile>(`${this._baseUrl}/${profile.id}`, profile).pipe(
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
