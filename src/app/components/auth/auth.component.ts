import { Component } from '@angular/core';
import { BackendServiceService } from '../../services/backend-service.service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(public backendService: BackendServiceService) {}

  usernameRegister: string = '';
  emailRegister: string = '';
  passwordRegister: string = '';

  emailLogin: string = '';
  passwordLogin: string = '';

  registerUserFunc(username: string, email: string, password: string) {
    let UserDetails = {
      username: username,
      email: email,
      password: password,
    };
    this.backendService.registration(UserDetails);
  }

  loginUserFunc(email: string, password: string) {
    let UserDetails = {
      Email: email,
      Password: password,
    };

    this.backendService.login(UserDetails);
  }
}
