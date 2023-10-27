import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServicesService } from '../app/core/services.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = sessionStorage.getItem('IsLoggedIn');;
  const router = inject(Router);

  if (loginService) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
