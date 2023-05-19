import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';
import { CryptoService } from '../services/crypto-service/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  perfil:string='';
  constructor(private router: Router){
     
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.perfil= JSON.parse( JSON.stringify(localStorage.getItem('perfil')));
      if (this.perfil==='client') {
        return true; // El usuario es cliente, se permite el acceso a la ruta
      } else {
        
        // El usuario no es administrador, se redirige a una página de acceso denegado o a la página principal
        this.router.navigate(['/']);
        return false;
      }
  }
  
}
