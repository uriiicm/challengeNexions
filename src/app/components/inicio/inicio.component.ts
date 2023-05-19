import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question-service/question.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  perfil:any='';
  constructor(private questionService:QuestionService ) { }

  ngOnInit(): void {
    this.perfil= localStorage.getItem('perfil');
   
  }

}
