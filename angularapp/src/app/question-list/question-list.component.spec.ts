import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionListComponent } from './question-list.component';
import { QuestionService } from '../services/question.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
 
describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;
  let service: QuestionService;
 
  const mockquestions = [
    {
      id: 1,
      number: 12,
      topic: 'java',
      content: 'What is oops',
      answer: 'Object Oriented programming language',
      marks: 100,
    },
    {
      id: 2,
      number: 124,
      topic: 'java',
      content: 'What is interface',
      answer: 'Object Oriented programming language',
      marks: 100,
    },
  ];
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionListComponent],
      providers: [QuestionService],
      imports: [HttpClientTestingModule], // Add this line
 
    });
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(QuestionService);
  });
 
 
  fit('should create QuestionListComponent', () => {
    expect(component).toBeTruthy();
  });
 
  fit('should call getQuestions', () => {
    spyOn((service as any), 'getQuestions').and.returnValue(of([]));
    (component as any).getQuestions();
    expect((component as any).getQuestions).toBeDefined();
    expect((component as any).getQuestions instanceof Function).toBeTruthy();
    expect((service as any).getQuestions).toHaveBeenCalled();
  });

  fit('should call deleteQuestion', () => {
    spyOn((service as any), 'deleteQuestion').and.returnValue(of());
    (component as any).deleteQuestion();
    expect((component as any).deleteQuestion).toBeDefined();
    expect((component as any).deleteQuestion instanceof Function).toBeTruthy();
    expect((service as any).deleteQuestion).toHaveBeenCalled();
  });

});




