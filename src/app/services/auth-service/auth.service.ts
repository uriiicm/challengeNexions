import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CryptoService } from '../crypto-service/crypto.service';

interface snackBar{
  open:boolean,
  type:string,
  message:string
}
interface ILogin {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  public snackBar = new BehaviorSubject<snackBar>({open:false,type:'success',message:'BIEN :)'});
  public snackBar$ = this.snackBar.asObservable();

  constructor(private readonly http: HttpClient,private cryptoService:CryptoService) {
      if(this.getToken()!=''){
        this.loggedIn.next(true);
      }
   }
  
  login(credentials: ILogin): Observable<any> {

    const email= credentials.email;
    const pass= credentials.password;

    // return this.http.get(`${environment.apiUser}/4`).pipe(
      return this.http.get(`${environment.apiUser}/?email=${email}&password=${pass}`).pipe(
      map((response:any) => {
        if(response.length==0){
          return;
        }
        const jwt = this.cryptoService.encriptar(response[0]);
        this.setToken(jwt);
        localStorage.setItem('perfil',response[0].profile)
        this.loggedIn.next(true);
        return response;
      })
    );
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string {
      if(localStorage.getItem('token')){
        return(JSON.parse(JSON.stringify(localStorage.getItem('token'))))
      }else{
        return '';
      }
  }
  getPerfil():Promise<string>{
    return new Promise((resolve,reject)=>{
      if(localStorage.getItem('perfil')){
        resolve(JSON.parse(JSON.stringify(localStorage.getItem('perfil'))))
      }else{
        reject('No se optuvo el perfil');
      }
    })
  }
}
