import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { filter, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private formsList = new Subject<any>();
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
  constructor(private http: HttpClient) {

  }

    loadForms(): Observable<any[]> {
      return this.http.get<any[]>(`${environment.apiForms}`).pipe(
          map((response:any) => {
          this.formsList.next(response);
            return response;
          })
        );
    }
    
  saveForm(form:any){
    return this.http.post<any>(`${environment.apiForms}`,form);
  }

  saveFilledForm(form:any){
    return this.http.post<any>(`${environment.apiFilledForms}`,form);
  }

  getFormsByUser(idUser:number){
    return this.http.get<any>(`${environment.apiFilledForms}?usuario.id=${idUser}`);
  }

  sendDataForm(data: any) {
    this.dataSubject.next(data);
  }

}
