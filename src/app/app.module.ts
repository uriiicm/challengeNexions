import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth-service/auth.service';
import { CryptoService } from './services/crypto-service/crypto.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ValidateInputDirective } from './directives/validate-input.directive';
import { UserPipe } from './pipes/user.pipe';
import { SnackBarComponent } from './components/modal/snackBar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    InicioComponent,
    ValidateInputDirective,
    UserPipe,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },AuthService],CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
