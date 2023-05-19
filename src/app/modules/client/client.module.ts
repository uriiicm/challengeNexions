import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormsComponent } from './client-forms/client-forms.component';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { FormFillingComponent } from './form-filling/form-filling.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientFormsListComponent } from './client-forms-list/client-forms-list.component';
import { CardComponent } from './card/card.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', redirectTo:'/forms',pathMatch: 'full'},
  { path: 'forms', component: ClientFormsComponent },
  { path: 'formsList', component: ClientFormsListComponent },
  { path: 'formFilling/:form', component: FormFillingComponent }
];

@NgModule({
  declarations: [ClientFormsComponent,FormFillingComponent,ClientFormsListComponent,CardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers:[QuestionService]
})
export class ClientModule { }
