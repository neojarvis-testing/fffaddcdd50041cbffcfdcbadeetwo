import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestionService } from './question.service';
 
describe('QuestionService', () => {
  let service: QuestionService;
  let httpTestingController: HttpTestingController;
 
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
      imports: [HttpClientTestingModule],
      providers: [QuestionService],
    });
    service = TestBed.inject(QuestionService) as any;
    httpTestingController = TestBed.inject(HttpTestingController);
  });
 
  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });
 
  fit('should be created', () => {
    expect(service).toBeTruthy();
  });
 
  fit('should retrieve questions from the API via GET', () => {
    // const mockquestions = [...]; // Define your mock data
    (service as any).getQuestions().subscribe((questions: any) => {
      expect(questions).toEqual(mockquestions);
    });
 
    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockquestions);
  });
 
  fit('should add a question via POST', () => {
    const newquestion = {
      number: 12,
      topic: 'java',
      content: 'What is oops',
      answer: 'Object Oriented programming language',
      marks: 100,
    };
 
    service['addQuestion'](newquestion).subscribe((question) => {
      expect(question).toEqual(newquestion);
    });
    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('POST');
    req.flush(newquestion);
  });
 
  fit('should delete a question via DELETE', () => {
    const questionId = 1;

    (service as any).deleteQuestion(questionId).subscribe(() => {
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}/${questionId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});


