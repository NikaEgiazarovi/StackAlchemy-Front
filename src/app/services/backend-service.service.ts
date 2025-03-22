import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BackendServiceService {
  constructor(private http: HttpClient) {}
  private registerUserUrl: string =
    'http://localhost:5135/api/User/RegisterUser';
  registration(UserDetails: any) {
    return this.http.post(this.registerUserUrl, UserDetails).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.log(error);
        return error;
      }
    );
  }
}
