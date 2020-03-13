import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from './page/profile.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class ProfileRoutingModule { }