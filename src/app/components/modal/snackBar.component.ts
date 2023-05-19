import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { QuestionService } from 'src/app/services/question-service/question.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackBar.component.html',
  styleUrls: ['./snackBar.component.scss']
})
export class SnackBarComponent implements OnInit,OnDestroy {
  dataSnackBar:any;
  visible:boolean=false;
  private subscription: Subscription = new Subscription();

  constructor(private questionService:QuestionService,private authService:AuthService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.openSnackBar();
  }

  openSnackBar():void{
  this.subscription=  this.authService.snackBar$.subscribe((res) => {
      console.log("listen",res);
      this.dataSnackBar=res;
      this.visible=this.dataSnackBar.open;
      if(this.visible){
        setTimeout(() => {
          this.authService.snackBar.next({
            open:false,
            type:'',
            message:''
          });
        }, 5000);
      }
    });

   
  }



}
