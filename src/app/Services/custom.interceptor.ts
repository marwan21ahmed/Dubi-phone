import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`Test Interceptor URL : ${req.url}`);
  let token=localStorage.getItem('token');
   // listen any service url
  const AuthReq = req.clone({
    headers: req.headers.set ('Authorization', `Bearer ${token} `)
  });
  return next(AuthReq);
};
