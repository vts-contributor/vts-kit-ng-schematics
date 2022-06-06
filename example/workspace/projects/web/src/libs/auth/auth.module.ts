import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../layout/feature/home-layout/home-layout.component';
import { HomeLayoutComponentModule } from '../layout/feature/home-layout/home-layout.module';

const routes: Routes = [
  { 
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: 'login', loadChildren: () => import('./feature/login/login.module').then(m => m.LoginComponentModule) },
      { path: 'register', loadChildren: () => import('./feature/register/register.module').then(m => m.RegisterComponentModule) },
      { path: 'forgot', loadChildren: () => import('./feature/forgot/forgot.module').then(m => m.ForgotComponentModule) },
      { path: '**', redirectTo: '/auth/login' },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    HomeLayoutComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})

export class AuthModule { }