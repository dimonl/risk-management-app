import {Component, OnInit} from '@angular/core';
import {RiskService} from '../shared/services/risk.service';
import {Risk} from '../shared/interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  currentRisk: Risk;

  constructor(private riskService: RiskService) {
    this.riskService.getSelectedRisk().subscribe((el: Risk) => {
      this.currentRisk = el;
    });
  }

  ngOnInit(): void {
  }
}
