import { Observable } from 'rxjs';
import { Profile } from './profile.model';
import { ProfileState, ProfileStore } from './profile.store';
import { Injectable } from "@angular/core";
import { QueryEntity } from '@datorama/akita';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProfileQuery extends QueryEntity<ProfileState, Profile>{
    public readonly profiles$: Observable<Profile[]> = this.selectAll();
    public readonly loading$: Observable<boolean> = this.selectLoading();
    public readonly detailsLoading$: Observable<boolean> = this.select(state => state.ui.detailsLoading);
    public readonly updating$: Observable<boolean> = this.select(state => state.ui.updating);
    public readonly sidepanelOpened$: Observable<boolean> = this.select(state => state.ui.sidepanelOpened);
    public readonly error$: Observable<HttpErrorResponse> = this.selectError();
    
    constructor(protected store: ProfileStore) {
        super(store);
    }
}
