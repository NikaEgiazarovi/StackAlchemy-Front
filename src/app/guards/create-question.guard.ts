import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

export const createQuestionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);
  const toastr = inject(ToastrService);
  if (!token) {
    router.navigate(['']);
    toastr.error('User is not logged in', 'Error');
    return false;
  } else {
    return true;
  }
};
