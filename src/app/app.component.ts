import { Component } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogged:any;
  constructor(private authService:AuthService){
    this.authService.loggedIn.subscribe((valor: any) => {
      this.isLogged = valor;
    });
  }

}
