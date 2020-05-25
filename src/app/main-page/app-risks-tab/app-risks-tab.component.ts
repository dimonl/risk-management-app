import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Risk} from '../../shared/interfaces';
import {RiskService} from '../../shared/services/risk.service';
import {emptyRisk, newRisk} from '../../shared/const';

@Component({
  selector: 'app-risks-tab',
  templateUrl: './app-risks-tab.component.html',
  styleUrls: ['./app-risks-tab.component.scss']
})
export class AppRisksTabComponent implements OnInit {

  public selectedRisk: Risk;
  public manageRisk = false;
  public userRisksList: Risk[];

  constructor(private riskService: RiskService) {
  }

  ngOnInit(): void {
    this.riskService.getRisks().subscribe(el => this.userRisksList = el);
    this.riskService.manageRisks.subscribe(el => this.manageRisk = el);
  }


  onSelect(risk: Risk): void {
    this.selectedRisk = risk;
    this.riskService.setSelectedRisk(risk);
  }

  AddRisk(): void {
    this.riskService.setSelectedRisk(newRisk);
  }
}
