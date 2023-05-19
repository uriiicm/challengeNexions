import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFormsComponent } from './admin-forms/admin-forms.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo:'/forms',pathMatch: 'full'},
  { path: 'forms', component: AdminFormsComponent },
];
@NgModule({
  declarations: [
    AdminFormsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
