import { NgModule } from '@angular/core';
import { RouterModule, Routes,PreloadAllModules} from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ClientGuard } from './guards/client.guard';
const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'inicio', component: InicioComponent,canActivate:[AuthGuard]},
  {
    path: 'client',
    canActivate:[AuthGuard,ClientGuard], 
    loadChildren: () =>
      import('./modules/client/client.module').then(
        (c) => c.ClientModule
      ),
  },
  {
    path: 'admin',
    canActivate:[AuthGuard,AdminGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then(
        (a) => a.AdminModule
      ),
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  
})
export class AppRoutingModule {

 }
