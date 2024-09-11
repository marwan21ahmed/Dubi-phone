import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtDecoderService {
  constructor() {}

  public decodeToken(token: string) {
    let str;
    let decode: any = jwtDecode(token);
    const newObj = {} as any;
    for (let prop in decode) {
      const val = decode[prop];
      if (prop.includes('/')) {
        str = prop.substring(prop.lastIndexOf('/') + 1, prop.length);
        newObj[str] = val;
      }
    }
    return newObj;
  }
}
