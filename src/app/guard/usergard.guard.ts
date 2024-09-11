import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/userService/user.service';


export const usergardGuard: CanActivateFn = (route, state) => {

  const authservices=inject(UserService)
  const router=inject(Router)
  if(authservices.userState){
    return true
  }
  else{
    router.navigate(["/login"])
    return false
  }
};
