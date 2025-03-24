import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { BackendServiceService } from '../../../services/backend-service.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: false,
})
export class RegistrationComponent {
  constructor(
    private backendService: BackendServiceService,
    private authService: AuthService
  ) {}

  registerUserFunc(name: string, email: string, password: string,event: Event) {
    event.preventDefault();

    if (!this.regexUserName.test(this.userNameInput)) {
      Swal.fire('Oops...', 'There are some numbers in your name!', 'error');
    } else if (!this.regexGmail.test(this.userEmailInput)) {
      Swal.fire('Oops...', 'Invalid email address!', 'error');
    } else if (!this.regexPassword.test(this.userPasswordInput)) {
      Swal.fire('Oops...', 'Invalid password!', 'error');
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        window.location.href = './Homepage.html';
      });
    }
    const UserDetails = {
      Username: name,
      Email: email,
      Password: password,
    };

    console.log(UserDetails);
    this.token = this.backendService.registration(UserDetails);
    this.authService.setToken(this.token);
    console.log(this.token);
  }

  token: any;
  userNameInput: string = '';
  userEmailInput: string = '';
  userPasswordInput: string = '';
  regexUserName = /^[a-zA-Z]+$/;
  regexGmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  regexPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;

  handleLogin(event: Event) {
    event.preventDefault();

    if (!this.regexUserName.test(this.userNameInput)) {
      Swal.fire('Oops...', 'There are some numbers in your name!', 'error');
    } else if (!this.regexGmail.test(this.userEmailInput)) {
      Swal.fire('Oops...', 'Invalid email address!', 'error');
    } else if (!this.regexPassword.test(this.userPasswordInput)) {
      Swal.fire('Oops...', 'Invalid password!', 'error');
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        window.location.href = './Homepage.html';
      });
    }
  }
}
