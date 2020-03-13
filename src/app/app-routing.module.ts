import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'profiles',
    loadChildren: () => import('./apps/profile/profile.module').then(module => module.ProfileModule)
  },
  {
    path: '**',
    redirectTo: 'profiles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
