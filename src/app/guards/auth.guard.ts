import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject, Injector } from '@angular/core';
import { AuthService } from '../services/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);
  if (token) {
    router.navigate(['']);
    return false;
  } else {
    return true;
  }
};
