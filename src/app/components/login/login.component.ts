import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import {ValidateInputDirective}from'../../directives/validate-input.directive';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private authApi:AuthService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }
  onSubmit():any{
    const credentials = this.loginForm.value;
    this.authApi.login(credentials).subscribe(response=>{
      
        if(response){          
          this.router.navigateByUrl('/');
        }else{
          this.authApi.snackBar.next({
            open:true,
            type:'error',
            message:'Usuario no encontrado'
          });
        }
    });
  }

}
