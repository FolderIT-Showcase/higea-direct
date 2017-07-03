import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CoreComponent} from './module/ui/core/core.component';
import {PublicHomeComponent} from './module/ui/public-home/public-home.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: PublicHomeComponent
      },
      {
        path: 'turno',
        loadChildren: './module/turno/turno.module#TurnoModule',
      },
    ]
  },

  // otherwise redirect to home
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
