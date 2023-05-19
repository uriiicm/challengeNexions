import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CryptoService } from 'src/app/services/crypto-service/crypto.service';
import { QuestionService } from 'src/app/services/question-service/question.service';

@Component({
  selector: 'app-client-forms',
  templateUrl: './client-forms.component.html',
  styleUrls: ['./client-forms.component.scss']
})
export class ClientFormsComponent implements OnInit,OnDestroy {
  formQuestion: FormGroup;
  formList:Array<any>=[];
  formListCopy:Array<any>=[];
  letters:string='';
  private subscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder,private questionService:QuestionService,private router: Router,private cryptoService:CryptoService) { 
    this.formQuestion = this.fb.group({});
  }
  
  ngOnInit(): void {
    this.loadForms();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  loadForms(){

    this.subscription =this.questionService.loadForms().subscribe(res=>{
      this.formList=res;
      this.formListCopy=res;
      
    });

  }

  filterForms(event:any):void{
    let formL;
    if(event.inputType==='deleteContentBackward'){
      if(this.letters===''){
        this.formList=this.formListCopy;
        return;
      }
      formL= this.formList.filter((item)=>{
        return item.key.toLowerCase().includes(this.letters.toLowerCase());
      })
    }else{
      formL= this.formList.filter((item)=>{
        return item.key.toLowerCase().includes(this.letters.toLowerCase());
      })
    }
    if(formL.length===0){
      formL=this.formListCopy;
    }
    this.formList=formL;
  }
}
