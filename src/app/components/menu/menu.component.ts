import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CryptoService } from 'src/app/services/crypto-service/crypto.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  menuItemsList:any;
  perfil:string='';
  token:string='';
  usuario:any;
  constructor(private authService:AuthService,private cryptoService:CryptoService) {
  }
  
  ngOnInit(): void {
    this.getPerfil();
    this.token=this.authService.getToken();
    this.getUsuario(this.token);
  }
  getUsuario(token:string):void{
    this.usuario=this.cryptoService.desencriptar(token);
  }
  getPerfil():void{
    this.authService.getPerfil().then((perfil)=>{
      this.perfil=perfil
    },(error)=>{alert(error)})
  }
  
  closeSession():void{
    localStorage.clear();    
    location.reload();
  }
}
