import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  perfil:string='';
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.perfil= JSON.parse( JSON.stringify(localStorage.getItem('perfil')));
      if (this.perfil==='admin') {
        return true; // El usuario es admin, se permite el acceso a la ruta
      } else {
        
        // El usuario no es administrador, se redirige a la página principal
        this.router.navigate(['/']);
        return false;
      }
    }
  
}
