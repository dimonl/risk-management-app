import {Injectable} from '@angular/core';
import {User} from '../interfaces';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JSON_HEADER, STORAGE_SAVED_TYPES, userAPI} from '../const';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  private authUser: User = null;


  register(user1: User): Observable<User> {
    return this.http.post<User>(userAPI, JSON.stringify(user1), {headers: JSON_HEADER});
  }


  login(user1: User): Observable<User> {
    let elem: User[] = null;
    return new Observable((observer) => {
      this.http.get<Array<User>>(userAPI).subscribe(
        next => {
          elem = next.filter((el) => el.name === user1.name && el.password === user1.password);
          if (elem.length !== 0){
            this.setUser(elem[0]);
            localStorage.setItem(STORAGE_SAVED_TYPES.name, elem[0].name);
            localStorage.setItem(STORAGE_SAVED_TYPES.id, elem[0].id);
            observer.next(elem[0]);
          }else {
            observer.error('error');
          }
        }
      );
    });
  }

  setUser(user: User) {
    if (user === null) {
      this.authUser = null;
    } else {
      this.authUser = user;
    }
  }

  getUser(): User {
    return this.authUser;
  }

  isAuthenticated(): boolean {
    return !!this.authUser;
  }

  logout() {
    this.setUser(null);
    localStorage.clear();
  }
}
