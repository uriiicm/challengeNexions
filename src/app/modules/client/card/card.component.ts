import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto-service/crypto.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent   {
  @Input() element: any;
  @Input() text: any;
  @Output() datosEnviados = new EventEmitter<string>();
  constructor(private router: Router,private cryptoService:CryptoService) { }

  fillForm(form:any):void{
    if(this.text!=='Abrir'){
      const formEncrypted=this.cryptoService.encriptar(JSON.stringify(form));
      this.router.navigate(['/client/formFilling',formEncrypted]);
    }else{
      this.datosEnviados.emit(form);
    }
  }
}
