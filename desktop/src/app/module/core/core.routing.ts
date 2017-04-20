import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {AuthGuard} from './guard/auth.guard';
import {LoginComponent} from '../auth/component/login/login.component';
import {RegisterComponent} from '../auth/component/register/register.component';
import {MetadataResolveService} from './service/metadata-resolve.service';
import {RegisterSocialComponent} from '../auth/component/register-social/register-social.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: {
      metadata: MetadataResolveService
    }
  },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'register',
    component: RegisterComponent,
  },
  {path: 'register-social', component: RegisterSocialComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
