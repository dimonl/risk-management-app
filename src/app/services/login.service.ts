import {Injectable} from '@angular/core';
import {User} from '../interfaces';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {userAPI} from '../const';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  private authUser: User = null;


  register(user1: User): Observable<User> {
    // console.log(JSON.stringify(user1));
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(userAPI, JSON.stringify(user1), {headers: myHeaders});
     // .subscribe(
    //   next => {
    //     this.setUser(next[0]);
    //     localStorage.setItem('user', next[0].name);
    //     localStorage.setItem('id', next[0].id);
    //   }
    // );
    // return this.getUser();
  }


  login(user1: User): Observable<User> {
    let elem: User[] = null;
    return new Observable((observer) => {
      this.http.get<Array<User>>(userAPI).subscribe(
        next => {
          elem = next.filter((el) => el.name === user1.name && el.password === user1.password);
          this.setUser(elem[0]);
          localStorage.setItem('user', elem[0].name);
          localStorage.setItem('id', elem[0].id);
          observer.next(elem[0]);
        }
      );
    });
  }

  setUser(user: User) {
    if (user === null) {
      this.authUser = null;
    } else {
      this.authUser = user;
      // this.authUser.id = user.id;
      // this.authUser.name = user.name;
      // this.authUser.password = user.password;
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
