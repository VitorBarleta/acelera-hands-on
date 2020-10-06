import { Observable } from 'rxjs';
import { Profile } from './profile.model';
import { ProfileState, ProfileStore } from './profile.store';
import { Injectable } from "@angular/core";
import { QueryEntity } from '@datorama/akita';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProfileQuery extends QueryEntity<ProfileState, Profile>{
    public profiles$: Observable<Profile[]> = this.selectAll();
    public loading$: Observable<boolean> = this.selectLoading();
    public detailsLoading$: Observable<boolean> = this.select(state => state.ui.detailsLoading);
    public updating$: Observable<boolean> = this.select(state => state.ui.updating);
    public sidepanelOpened$: Observable<boolean> = this.select(state => state.ui.sidepanelOpened);
    public error$: Observable<HttpErrorResponse> = this.selectError();
    
    constructor(protected store: ProfileStore) {
        super(store);
    }
}
