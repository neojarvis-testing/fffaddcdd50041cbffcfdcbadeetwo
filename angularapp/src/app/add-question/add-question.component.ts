import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
 
  questionForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private questionService: QuestionService) {
    this.questionForm = this.formBuilder.group({
      number: ['', Validators.required],
      topic: ['', Validators.required],
      content: ['', Validators.required],
      answer: ['', [Validators.required, Validators.maxLength(75)]],
      marks: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }
  addNewQuestion() {
    if (this.questionForm.valid) {
      console.log(this.questionForm.value);
      try{
        this.questionService.addQuestion(this.questionForm.value)
          .subscribe((res) => {
           console.log(res)
            // this.questions = res
          },(err)=>{
            console.log(err)
          });
      }catch(err){
        console.log("Err",err)
      }
    }
  }

}
