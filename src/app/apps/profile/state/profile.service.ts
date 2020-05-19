import { Profile, ProfileDetail } from './profile.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class ProfileService {
    private readonly _baseUrl: string = 'http://localhost:3000/profiles';

    public isProfileLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isProfileDetailLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isUpdatingProfile$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private httpClient: HttpClient) { }

    public getProfiles(): Observable<Array<Profile>> {
        this.isProfileLoading$.next(true);
        return this.httpClient.get<Array<Profile>>(this._baseUrl).pipe(
            tap(() => this.isProfileLoading$.next(false)));
    }

    public getProfile(id: number): Observable<ProfileDetail> {
        this.isProfileDetailLoading$.next(true);
        return this.httpClient.get<ProfileDetail>(`${this._baseUrl}/${id}`).pipe(
            tap(() => this.isProfileDetailLoading$.next(false)));
    }

    public updateProfile(profile: ProfileDetail): Observable<any> {
        this.isUpdatingProfile$.next(true);
        return this.httpClient.put(`${this._baseUrl}/${profile.id}`, profile).pipe(
            tap(() => this.isUpdatingProfile$.next(false)));
    }
}