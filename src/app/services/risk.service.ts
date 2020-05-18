import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Risk, User} from '../interfaces';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';
import {RisksAPI} from '../const';

@Injectable({
  providedIn: 'root'
})
export class RiskService {

  constructor(private http: HttpClient, private auth: LoginService) { }


  getRisks(): Observable<Array<Risk>>{

    let elem: Risk[] = null;
    const currentUser: User = this.auth.getUser();
    return new Observable((observer) => {
      this.http.get<Array<Risk>>(RisksAPI).subscribe(
        next => {
          elem = next.filter((el) => el.userID === currentUser.id);
          // this.setUser(elem[0]);
          // localStorage.setItem('user', elem[0].name);
          // localStorage.setItem('id', elem[0].id);
          observer.next(elem);
        }
      );
    });
  }
}
