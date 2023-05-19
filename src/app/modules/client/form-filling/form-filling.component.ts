import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CryptoService } from 'src/app/services/crypto-service/crypto.service';
import { QuestionService } from 'src/app/services/question-service/question.service';

@Component({
  selector: 'app-form-filling',
  templateUrl: './form-filling.component.html',
  styleUrls: ['./form-filling.component.scss']
})
export class FormFillingComponent implements OnDestroy {
  form:any;
  formQuestion: FormGroup;
  formLoaded:boolean=false;
  elementsForm:Array<any>=[];
  usuario:any;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private router: Router,private cryptoService:CryptoService,private authService:AuthService,private questionService:QuestionService) {
    this.formQuestion = this.fb.group({});
    const form =this.cryptoService.desencriptar(String(this.route.snapshot.paramMap.get('form'))) ;
    this.form=JSON.parse(form);
    this.loadFormDinamic(this.form.questions);
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

   loadFormDinamic(campos:Array<any>):void{
    campos.forEach((campo:any) => {
      this.formQuestion.addControl(campo.idQuestion.toLowerCase(), this.fb.control(campo.value,[Validators.required]));
    });
    this.formLoaded=true;
  }

  sendForm():void{
    this.setValuesForm().then(data=>{
      this.usuario= this.cryptoService.desencriptar(this.authService.getToken());
      const dataForm= {
        usuario:this.usuario,
        form:{
          name:this.form.name,
          key:this.form.key,
          elements:data
        }
      }
     this.subscription= this.questionService.saveFilledForm(dataForm).subscribe((res)=>{
        this.authService.snackBar.next({
          open:true,
          type:'success',
          message:'Tus respuestas se enviaron correctamente'
        });
        this.router.navigate(['/client/forms']);        
      });
    })
    
    
  }

  setValuesForm():Promise<any>{
    return new Promise((resolve,reject)=>{
    
      this.form.questions.forEach((element:any )=> {        
         this.elementsForm.push({
           label:element.label,
           value:this.formQuestion.controls[ element.idQuestion.toLowerCase()].value
         })
     });
     if(this.elementsForm.length>0){
       resolve(this.elementsForm);
     }else{
      reject('No se encontraron datos del formulario');
     }
     

    })
  }
  onFileSelected(event:any):void{
    const file: File = event.target.files[0];    
  }
}
