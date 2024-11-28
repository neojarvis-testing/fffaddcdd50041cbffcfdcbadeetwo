import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { question } from '../model/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private backendUrl = 'http://localhost:3000/questions'; 

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<question[]> {
    return this.http.get<question[]>(this.backendUrl);
  }

  addQuestion(question: question): Observable<question> {
    return this.http.post<question>(this.backendUrl, question);
  }

  deleteQuestion(id: number): Observable<void> {
    const url = `${this.backendUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
