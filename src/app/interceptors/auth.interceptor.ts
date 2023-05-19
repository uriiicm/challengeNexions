import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest,HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer PERSONALIZADO-${token}`
        }
      });
    }

    // return next.handle(request)
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Aquí puedes manejar el error y mostrar una alerta o realizar cualquier otra acción
        alert('Error en la solicitud');

        // Lanzar el error nuevamente para que pueda ser manejado por otros operadores de error en el flujo
        return throwError(error);
      })
    );
    
  }
}
