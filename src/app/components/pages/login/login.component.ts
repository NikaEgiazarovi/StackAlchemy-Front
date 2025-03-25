import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { BackendServiceService } from '../../../services/backend-service.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private backendService: BackendServiceService,
    private authService: AuthService
  ) { }

  async loginUserFunc(email: string, password: string, event: Event) {
    event.preventDefault();

    if (!this.regexGmail.test(email)) {
      await Swal.fire('Oops...', 'Invalid email address!', 'error');
      return;
    }
    if (!this.regexPassword.test(password)) {
      await Swal.fire('Oops...', 'Invalid password!', 'error');
      return;
    }

    await Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: true,
      timer: 1500,
    });

    window.location.href = './Homepage.html';
  }

  token: any;

  userEmailInput: string = '';
  userPasswordInput: string = '';
  regexUserName = /^[a-zA-Z]+$/;
  regexGmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  regexPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;


}
