import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { error } from 'console';

interface AuthResponse {
  token: string;
  message: string;
}
interface CreateQuestionResponse {
  question: any;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class BackendServiceService {
  private registerUserUrl: string =
    'http://localhost:5135/api/User/RegisterUser';

  private getAllQuestionsUrl: string =
    'http://localhost:5135/api/Question/GetAllQuestions';

  private loginUserUrl: string = 'http://localhost:5135/api/User/LoginUser';

  private createQuestionUrl: string =
    'http://localhost:5135/api/Question/CreateQuestion';
  constructor(private http: HttpClient, private authService: AuthService) {}

  createQuestion(Question: any) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http
      .post<CreateQuestionResponse>(this.createQuestionUrl, Question, {
        headers,
      })
      .subscribe(
        (data) => {
          console.log(data);
          return data.message;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  registration(UserDetails: any) {
    return this.http
      .post<AuthResponse>(this.registerUserUrl, UserDetails)
      .subscribe(
        (data) => {
          console.log(data);
          return data.message;
        },
        (error) => {
          console.log(error);
          return error;
        }
      );
  }

  login(UserDetails: any) {
    return this.http
      .post<AuthResponse>(this.loginUserUrl, UserDetails)
      .subscribe(
        (data) => {
          this.authService.setToken(data.token);
          return data.message;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getAllQuestionsRequest() {
    return this.http.get(this.getAllQuestionsUrl);
  }
}
