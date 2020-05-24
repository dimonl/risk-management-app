import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../shared/services/login.service';
import {RiskService} from '../../../shared/services/risk.service';
import {MENU_NAMES} from '../../../shared/const';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  userName: string = localStorage.getItem('user');
  NameCommand: string = MENU_NAMES.manageRisk;

  constructor(private auth: LoginService,
              private riskService: RiskService,
              private router: Router) {
    this.NameCommand = this.changeMenuName(this.riskService.manageRisks.value);
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.auth.logout();
    this.riskService.manageRisks.next(false);
    this.router.navigate(['/login']);
  }

  manageRisks() {
    this.riskService.manageRisks.next(!this.riskService.manageRisks.value);
    this.NameCommand = this.changeMenuName(this.riskService.manageRisks.value);
  }

  private changeMenuName(type: boolean): string {
    return type ? MENU_NAMES.mainPage : MENU_NAMES.manageRisk;
  }

}
