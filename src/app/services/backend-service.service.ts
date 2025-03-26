import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GlobalVariablesService } from './global-variables.service';
import { error } from 'console';
import { Observable } from 'rxjs';

interface AuthResponse {
  token: string;
  message: string;
}
interface CreateQuestionResponse {
  question: any;
  message: string;
}
interface QuestionResponse {
  message: string;
  question: any;
  answers: [];
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

  private GetQuestionsAnswersUrl: string =
    'http://localhost:5135/api/Answer/GetQuestionsAnswers';

  private GetQuestionByIdUrl =
    'http://localhost:5135/api/Question/GetQuestionById';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private globalVaraiblesService: GlobalVariablesService
  ) {}

  getQuestion(questionId: number): Observable<QuestionResponse> {
    const headers = new HttpHeaders().set('questionId', questionId.toString());
    return this.http.get<QuestionResponse>(this.GetQuestionByIdUrl, {
      headers,
    });
  }
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
