import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CryptoService } from 'src/app/services/crypto-service/crypto.service';
import { QuestionService } from 'src/app/services/question-service/question.service';

@Component({
  selector: 'app-client-forms-list',
  templateUrl: './client-forms-list.component.html',
  styleUrls: ['./client-forms-list.component.scss']
})
export class ClientFormsListComponent implements OnInit,OnDestroy {
  usuario: any;
  formList:Array<any>=[];
  formListCopy:Array<any>=[];
  letters:string='';
  dataModal:any;
  verModal:boolean=false;
  private subscription: Subscription = new Subscription();
  
  constructor(private questionService:QuestionService,private cryptoService:CryptoService,private authService:AuthService) {
    this.usuario= this.cryptoService.desencriptar(this.authService.getToken());
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getFormsByUser();
  }

  getFormsByUser(){
    
    this.subscription=this.questionService.getFormsByUser(this.usuario.id).subscribe((res:Array<any>)=>{
      this.formList=res; 
      this.formListCopy=res;      
    })
  }
  recibirDatos(data:any):void{
    console.log("data recibida ",data);
    this.dataModal=data;
    this.verModal=true;
  
  }
  filterForms(event:any):void{
    let formL;
    if(event.inputType==='deleteContentBackward'){
      if(this.letters===''){
        this.formList=this.formListCopy;
        return;
      }
      formL= this.formList.filter((item)=>{
        return item.form.key.toLowerCase().includes(this.letters.toLowerCase());
      })
    }else{
      formL= this.formList.filter((item)=>{
        return item.form.key.toLowerCase().includes(this.letters.toLowerCase());
      })
    }
    if(formL.length===0){
      formL=this.formListCopy;
    }
    this.formList=formL;
  }

  cerrarModal():void{
    this.verModal=false;
  }
 

}
