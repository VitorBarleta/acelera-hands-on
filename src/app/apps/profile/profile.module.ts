import { ProfileQuery } from './state/profile.query';
import { ProfileStore } from './state/profile.store';
import { ProfileService } from './state/profile.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './page/profile.component';
import { ProfileListComponent } from './components/list/profile-list.component';
import { ProfileDetailsComponent } from './components/details/profile-details.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileListComponent,
        ProfileDetailsComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,

        // Material imports
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,

        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        HttpClientModule
    ],
    providers: [
        ProfileStore,
        ProfileQuery,
        ProfileService
    ]
})
export class ProfileModule { }