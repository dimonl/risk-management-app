import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Risk, User} from '../interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginService} from './login.service';
import {RisksAPI} from '../const';

@Injectable({
  providedIn: 'root'
})
export class RiskService {


  constructor(private http: HttpClient, private auth: LoginService) {
  }


  private riskArray = new BehaviorSubject<Array<Risk>>([new Risk('11111', '', '', '', 0, 0)]);

  public manageRisks = new BehaviorSubject<boolean>(false);

  private selectedRisk = new BehaviorSubject<Risk>(new Risk('11111', '', '', '', 0, 0));

  getRisks(): Observable<Array<Risk>> {

    const currentUser: User = this.auth.getUser();
    this.http.get<Array<Risk>>(RisksAPI).subscribe(
      next => {
        this.riskArray.next(next.filter((el) => el.userID === currentUser.id));
      }
    );

    return this.riskArray.asObservable();

  }

  getSelectedRisk(): Observable<Risk> {
    return this.selectedRisk.asObservable();
  }

  setSelectedRisk(value: Risk) {
    this.selectedRisk.next(value);
  }

  sortby(sortType: string) {
    this.riskArray.value.sort((firstRisk, secondRisk) => {
      let result: number;
      switch (sortType) {
        case 'by_time':
          result = firstRisk.impactTime > secondRisk.impactTime ? 1 : -1;
          break;
        case 'by_probability':
          result = firstRisk.probability > secondRisk.probability ? 1 : -1;
          break;
        case 'by_name':
          result = firstRisk.nameRisk.toLowerCase() > secondRisk.nameRisk.toLowerCase() ? 1 : -1;
          break;
      }
      return result;
    });
  }

  updateSelectedRisk(cRisk: Risk): Observable<Risk> {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Risk>(RisksAPI + '/' + cRisk.id, cRisk, {headers: myHeaders});
  }
}
