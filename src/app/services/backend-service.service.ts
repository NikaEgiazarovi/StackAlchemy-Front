import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BackendServiceService {
  constructor(private http: HttpClient) {}
  private getAllQuestionsUrl: string =
    'http://localhost:5135/api/Question/GetAllQuestions';
  getAllQuestionsRequest() {
    return this.http.get(this.getAllQuestionsUrl);
  }
}
