import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

interface RegistrationResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class BackendServiceService {
  private registerUserUrl: string =
    'http://localhost:5135/api/User/RegisterUser';

  private getAllQuestionsUrl: string =
    'http://localhost:5135/api/Question/GetAllQuestions';

  constructor(private http: HttpClient, private authService: AuthService) {}

  registration(UserDetails: any) {
    return this.http
      .post<RegistrationResponse>(this.registerUserUrl, UserDetails)
      .subscribe(
        (data) => {
          this.authService.setToken(data.token);
          return data;
        },
        (error) => {
          console.log(error);
          return error;
        }
      );
  }

  getAllQuestionsRequest() {
    return this.http.get(this.getAllQuestionsUrl);
  }
}
