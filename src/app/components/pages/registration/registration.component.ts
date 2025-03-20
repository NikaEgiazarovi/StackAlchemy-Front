import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  regexUserName = /^[a-zA-Z]+$/;
  regexGmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  regexPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;

  handleLogin(event: Event) {
    event.preventDefault();

    const userNameInput = (document.getElementById("usermainName") as HTMLInputElement)?.value;
    const userEmailInput = (document.getElementById("userGmail") as HTMLInputElement)?.value;
    const userPasswordInput = (document.getElementById("userPassword") as HTMLInputElement)?.value;

    if (!this.regexUserName.test(userNameInput)) {
      Swal.fire("Oops...", "There are some numbers in your name!", "error");
    } else if (!this.regexGmail.test(userEmailInput)) {
      Swal.fire("Oops...", "Invalid email address!", "error");
    } else if (!this.regexPassword.test(userPasswordInput)) {
      Swal.fire("Oops...", "Invalid password!", "error");
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: true,
        timer: 1500
      }).then(() => {
        window.location.href = "./Homepage.html";
      });
    }
  }
}
