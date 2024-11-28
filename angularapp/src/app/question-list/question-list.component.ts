import { Component, OnInit } from '@angular/core';
import { question } from '../model/question.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    try{
    this.questionService.getQuestions()
      .subscribe((res) => {
       console.log(res)
        this.questions = res
      },(err)=>{
        console.log(err)
      });
  }catch(err){
    console.log("Err",err)
  }
}

  deleteQuestion(id: any): void {
    this.questionService.deleteQuestion(id)
      .subscribe(() => {
        // Remove the deleted question from the list
        this.questions = this.questions.filter(question => question.id !== id);
      });
  }
}
