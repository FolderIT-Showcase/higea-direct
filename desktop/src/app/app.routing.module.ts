import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CoreComponent} from './module/ui/core/core.component';
import {AuthGuard} from './service/guard/auth.guard';
import {HomeComponent} from './module/ui/home/home.component';
import {IntegrantesResolveService} from './service/resolve/integrantes-resolve.service';
import {MetadataResolveService} from './service/resolve/metadata-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        resolve: {
          integrantes: IntegrantesResolveService
        }
      },
      {
        path: 'turno',
        loadChildren: './module/turno/turno.module#TurnoModule',
      },
      {
        path: 'grupo-familiar',
        loadChildren: './module/grupo-familiar/grupo-familiar.module#GrupoFamiliarModule',
        resolve: {
          metadata: MetadataResolveService,
        }
      },
      {
        path: 'admin',
        loadChildren: './module/admin/admin.module#AdminModule',
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: './module/auth/auth.module#AuthModule',
  },

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
