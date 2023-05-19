import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { QuestionService } from 'src/app/services/question-service/question.service';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.scss']
})
export class AdminFormsComponent implements OnDestroy{
  myForm: FormGroup;
  nombreForm:string='';
  clave:string='';
  formularioData:any;
  questionsList:Array<any>=[];
  private subscription: Subscription = new Subscription();
  constructor(private questionService:QuestionService,private authService:AuthService) { 
    this.formularioData={
      key:'',
      name:'',
    }
    this.myForm = new FormGroup({
      label: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      option1: new FormControl(''),
      option2: new FormControl(''),
      option3: new FormControl('')
    });
  }
  ngOnDestroy(): void {    
    this.subscription.unsubscribe();
  }

  addQuestion():void{
    this.questionsList.push(this.myForm.value);
    this.myForm.reset();
  }
  guardaForm():void{
    const elementsQuestion= this.questionsList.map((element)=>{
      const options=[];
      let question:any={
        label:element.label,
        type:element.type,
        idQuestion:element.label.split(" ").join(""),
        value:'',
        options:[]
      }
      if(element.type==='catalog'){
        options.push(element.option1)
        options.push(element.option2)
        options.push(element.option3)
        question.options=options;
      }

      return question;
    })
    
    this.formularioData.questions=[...elementsQuestion];
    this.formularioData.name=this.nombreForm;
    this.formularioData.key=this.clave;

    this.subscription= this.questionService.saveForm(this.formularioData).subscribe((res)=>{
        if(res){
          this.authService.snackBar.next({
            open:true,
            type:'success',
            message:'Formulario guardado con éxito'
          });
          this.myForm.reset();
         this.nombreForm='';
         this.clave='';
          this.questionsList=[];
        }
    });
  }
  
}
