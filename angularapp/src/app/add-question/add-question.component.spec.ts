import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  FormBuilder,
  MaxLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddQuestionComponent } from './add-question.component';
import { QuestionService } from '../services/question.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

describe('AddquestionComponent', () => {
  let component: AddQuestionComponent;
  let fixture: ComponentFixture<AddQuestionComponent>;
  let service: QuestionService;
  let debugElement: DebugElement;
  let formBuilder: FormBuilder;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [QuestionService],
    });
    formBuilder = TestBed.inject(FormBuilder) as any;
    fixture = TestBed.createComponent(AddQuestionComponent) as any;
    component = fixture.componentInstance as any;
    service = TestBed.inject(QuestionService) as any;
    fixture.detectChanges();
  });

  fit('should create AddquestionComponent', () => {
    expect(component).toBeTruthy();
  });


  fit('should add a new question when form is valid', () => {
    const mockquestion = {
      number: 12,
      topic: 'java',
      content: 'What is oops',
      answer: 'Object Oriented programming language',
      marks: 100,
    };
    spyOn((service as any), 'addQuestion').and.returnValue(of(mockquestion)); // Mock the addquestion method
    (component as any).questionForm.setValue(mockquestion); // Set form values
    (component as any).addNewQuestion(); // Trigger the addNewquestion method
    expect((component as any).questionForm.valid).toBeTruthy();
    expect(service['addQuestion']).toHaveBeenCalledWith(mockquestion);
  });


  fit('should add all the required fields', () => {
    const form = (component as any).questionForm;
    form.setValue({
        number: '',
        topic: '',
        content: '',
        answer: '',
        marks: '',
    });

    expect(form.valid).toBeFalsy();
    expect(form.get('number')?.hasError('required')).toBeTruthy();
    expect(form.get('topic')?.hasError('required')).toBeTruthy();
    expect(form.get('content')?.hasError('required')).toBeTruthy();
    expect(form.get('answer')?.hasError('required')).toBeTruthy();
    expect(form.get('marks')?.hasError('required')).toBeTruthy();

  });

  fit('should validate answer length', () => {
    const form = (component as any).questionForm;
    form.setValue({
      number: '12',
      topic: 'java',
      content: 'What is oops',
      answer: 'Object Oriented programming language',
      marks: '100',
    });
    expect(form.valid).toBeTruthy();
    expect(form.get('answer')?.hasError('maxlength')).toBeFalsy();
    form.setValue({
      number: '12',
      topic: 'java',
      content: 'What is oops',
      answer: 'Object Oriented programmi bhiwrehinsgdrw ntirwhtirwn jhgisnhtik jhjdbsjabteBUKGJBS SJGHBJDSBGSJG RSJBHBGJASBGURHGUTWE GSJBGJbsbgar ujbsgjwarbge ajbafsjgbsjagb',
      marks: '100',
    });
    expect(form.invalid).toBeTruthy();
    expect(form.get('answer')?.hasError('maxlength')).toBeTruthy();
  });

});



