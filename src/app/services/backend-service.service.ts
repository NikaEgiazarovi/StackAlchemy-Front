import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

interface AuthResponse {
  token: string;
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

  constructor(private http: HttpClient, private authService: AuthService) {}

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
