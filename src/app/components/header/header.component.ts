import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from '../../services/global-variables.service';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { BackendServiceService } from '../../services/backend-service.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(
    public globalVariables: GlobalVariablesService,
    private authService: AuthService,
    private cookieService: CookieService,
    private toastr: ToastrService,
    public globalVar:GlobalVariablesService,
    private backendService:BackendServiceService
  ) {}
  token: string | null = null;
  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.backendService.getUsername(this.token)
  }
  deleteCookies() {
    this.cookieService.delete('token');
    this.toastr.success('User LoggedOut!', 'Success');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  auth = this.globalVariables.auth;
}
