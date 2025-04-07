import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GlobalVariablesService } from './global-variables.service';
import { error } from 'console';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Token } from '@angular/compiler';

interface AuthResponse {
  token: string;
  message: string;
}
interface CreateQuestionResponse {
  question: any;
  message: string;
}

interface CreateAnswerResponse {
  question: any;
  message: string;
}
interface QuestionResponse {
  message: string;
  question: any;
  answers: [];
}

interface DeleteAnswerResponse
{
  message:string;
}

interface GetUserByIdResponse
{
  username:string;
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

    private DeleteAnswerUrl = "http://localhost:5135/api/Answer/DeleteAnswer"
    

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private globalVaraiblesService: GlobalVariablesService,
    private toastr: ToastrService
  ) {}

  getUsername(token:string | null)
  {
    if(token == null)
    {
      console.log("token is null")
      return;
    }
     let GetUserByIdUrl = `http://localhost:5135/api/User/GetUserById?token=${token}`
     return this.http.get<GetUserByIdResponse>(GetUserByIdUrl).subscribe((data)=>
    {
      this.globalVaraiblesService.Username = data.username
    },
  (error)=>
  {
    console.log(error)
  })
  }
  deleteQuestion(deleteAnswerObject:any)
  {
    return this.http.delete<DeleteAnswerResponse>(this.DeleteAnswerUrl, {
      body: deleteAnswerObject 
    }).subscribe(
      (data) => {
        this.toastr.success(`${data.message}`, 'Success');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return data
      },
      (error) => {
        this.toastr.error(`${error.error.message}`, 'Error');
        return error
      }
    );
  }

  getQuestion(questionId: number): Observable<QuestionResponse> {
    const headers = new HttpHeaders().set('questionId', questionId.toString());
    return this.http.get<QuestionResponse>(this.GetQuestionByIdUrl, {
      headers,
    });
  }

  createAnswer(Answer: any) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http
      .post<CreateAnswerResponse>(
        'http://localhost:5135/api/Answer/CreateAnswer',
        Answer,
        {
          headers,
        }
      )
      .subscribe(
        (data) => {
          this.toastr.success(`${data.message}`, 'Success');
          console.log(data);
          return data;
        },
        (error) => {
          this.toastr.error(`${error.error.title}`, 'Error');
          console.log(error);
          return error;
        }
      );
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
          this.toastr.success(`${data.message}`, 'Success');
          return data.message;
        },
        (error) => {
          this.toastr.error(`${error.error.title}`, 'Error');
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
          this.toastr.success(`${data.message}`, 'Success');
          return data.message;
        },
        (error) => {
          console.log(error);
          this.toastr.error(`${error.error.mesage}`, 'Error');
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
          this.toastr.success(`${data.message}`, 'Success');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return data.message;
        },
        (error) => {
          this.toastr.error(`${error.error.message}`, 'Error');
          console.log(error);
        }
      );
  }

  getAllQuestionsRequest() {
    return this.http.get(this.getAllQuestionsUrl);
  }
}
