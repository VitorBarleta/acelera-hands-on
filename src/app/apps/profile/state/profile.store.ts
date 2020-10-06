import { Profile } from './profile.model';
import { Injectable } from "@angular/core";
import { EntityStore, EntityState, StoreConfig, ActiveState } from '@datorama/akita';

export interface ProfileState extends EntityState<Profile>, ActiveState {
    ui: {
        detailsLoading: boolean;
        updating: boolean;
        sidepanelOpened: boolean;
    }
}

@StoreConfig({ name: 'profile-store', idKey: 'id', cache: { ttl: 300000 } })
@Injectable()
export class ProfileStore extends EntityStore<ProfileState> {

    constructor() {
        super({ ui: { detailsLoading: false, updating: false, sidepanelOpened: false } });
    }

    public setDetailsLoading(loading: boolean = false): void {
        this.update((state) => ({ ui: { ...state.ui, detailsLoading: loading } }))
    }

    public setUpdating(updating: boolean = false): void {
        this.update((state) => ({ ui: { ...state.ui, updating: updating } }))
    }

    public toggleSidepanel(toggle: boolean = false): void {
        this.update((state) => ({ ui: { ...state.ui, sidepanelOpened: toggle } }));
    }
}
