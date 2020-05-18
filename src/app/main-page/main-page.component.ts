import {Component, OnInit} from '@angular/core';
import {RiskService} from '../services/risk.service';
import {Risk} from '../interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private riskService: RiskService) {
  }

  risksList: Risk[] = null;

  currentRisk: Risk;

  ngOnInit(): void {
    this.riskService.getRisks().subscribe(
      next => {
        // console.log(localStorage.getItem('user'));
        this.risksList = next;
      },
      error => {
        console.log('error get risks');
      }
    );
  }

  receiveMessage($event) {
    this.currentRisk = $event;
  }
}
