import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Risk, User} from '../interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginService} from './login.service';
import {emptyRisk, JSON_HEADER, RisksAPI, SORT_TYPE, STORAGE_SAVED_TYPES} from '../const';

@Injectable({
  providedIn: 'root'
})
export class RiskService {


  constructor(private http: HttpClient, private auth: LoginService) {
  }

  private sortAscending = false;
  private riskArray = new BehaviorSubject<Array<Risk>>([emptyRisk]);
  public manageRisks = new BehaviorSubject<boolean>(false);
  private selectedRisk = new BehaviorSubject<Risk>(emptyRisk);

  getRisks(): Observable<Array<Risk>> {

    const currentUser: User = this.auth.getUser();
    const currentUserID: string = localStorage.getItem(STORAGE_SAVED_TYPES.id);
    this.http.get<Array<Risk>>(RisksAPI).subscribe(
      next => {
        this.riskArray.next(next.filter((el) => el.userID === currentUserID));
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

  sortBy(sortType: string) {
    this.sortAscending = !this.sortAscending;
    this.riskArray.value.sort((firstRisk, secondRisk) => {
      let result: boolean;
      switch (sortType) {
        case SORT_TYPE.by_time:
          // tslint:disable-next-line:max-line-length
          result = (this.sortAscending ? firstRisk.impactTime > secondRisk.impactTime : firstRisk.impactTime < secondRisk.impactTime); // ? 1 : -1;
          break;
        case SORT_TYPE.by_probability:
          // tslint:disable-next-line:max-line-length
          result = (this.sortAscending ? firstRisk.probability > secondRisk.probability : firstRisk.probability < secondRisk.probability); // ? 1 : -1;
          break;
        case SORT_TYPE.by_name:
          // tslint:disable-next-line:max-line-length
          result = (this.sortAscending ? firstRisk.nameRisk.toLowerCase() > secondRisk.nameRisk.toLowerCase() : firstRisk.nameRisk.toLowerCase() < secondRisk.nameRisk.toLowerCase()); //  ? 1 : -1;
          break;
      }
      return result ? 1 : -1;
    });
  }

  updateSelectedRisk(cRisk: Risk): Observable<Risk> {
    return this.http.put<Risk>(RisksAPI + '/' + cRisk.id, cRisk, {headers: JSON_HEADER});
  }

  addNewRisk(cRisk: Risk): Observable<Risk> {
    return this.http.post<Risk>(RisksAPI, cRisk, {headers: JSON_HEADER});
  }

  deleteSelectedRisk(cRisk: Risk): Observable<Risk> {
    return this.http.delete<Risk>(RisksAPI + '/' + cRisk.id);
  }

}
