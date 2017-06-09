import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CoreComponent} from './module/ui/core/core.component';
import {AuthGuard} from './service/guard/auth.guard';
import {HomeComponent} from './module/ui/home/home.component';
import {IntegrantesResolveService} from './service/resolve/integrantes-resolve.service';
import {TurnoModule} from './module/turno/turno.module';
import {GrupoFamiliarModule} from './module/grupo-familiar/grupo-familiar.module';
import {AdminModule} from './module/admin/admin.module';
import {AuthModule} from './module/auth/auth.module';

export function loadTurnoModule() {
  return TurnoModule
}
export function loadGrupoFamiliarModule() {
  return GrupoFamiliarModule
}
export function loadAdminModule() {
  return AdminModule
}
export function loadAuthModule() {
  return AuthModule
}

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
        // loadChildren: 'module/turno/turno.module#TurnoModule',
        loadChildren: loadTurnoModule,
      },
      {
        path: 'grupo-familiar',
        // loadChildren: 'module/grupo-familiar/grupo-familiar.module#GrupoFamiliarModule',
        loadChildren: loadGrupoFamiliarModule,
      },
      {
        path: 'admin',
        // loadChildren: 'module/admin/admin.module#AdminModule',
        loadChildren: loadAdminModule,
      },
    ]
  },
  {
    path: 'auth',
    // loadChildren: 'module/auth/auth.module#AuthModule',
    loadChildren: loadAuthModule,
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
