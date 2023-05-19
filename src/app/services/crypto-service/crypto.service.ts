import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

   encriptar(objeto: any): string {
    const objetoString = JSON.stringify(objeto);
    const objetoEncriptado = CryptoJS.AES.encrypt(objetoString, environment.criptoKey).toString();
    return objetoEncriptado;
  }

   desencriptar(objetoEncriptado: string): any {
    const bytes = CryptoJS.AES.decrypt(objetoEncriptado,environment.criptoKey);
    const objetoString = bytes.toString(CryptoJS.enc.Utf8);
    const objeto = JSON.parse(objetoString);
    return objeto;
  }
}
