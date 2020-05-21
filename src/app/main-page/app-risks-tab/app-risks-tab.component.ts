import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Risk} from '../../shared/interfaces';
import {RiskService} from '../../shared/services/risk.service';

@Component({
  selector: 'app-risks-tab',
  templateUrl: './app-risks-tab.component.html',
  styleUrls: ['./app-risks-tab.component.scss']
})
export class AppRisksTabComponent implements OnInit {

  selectedRisk: Risk;
  manageRisk = false;
  userRisksList: Risk[];

  constructor(private riskService: RiskService) {
  }

  ngOnInit(): void {

    this.riskService.getRisks().subscribe(el => this.userRisksList = el);

    // console.log(this.userRisksList);
    // this.userRisks = [
    //   {
    //     id: '1',
    //     userID: '1',
    //     nameRisk: 'first risk',
    //     description: 'its a holiday',
    //     impactTime: 12,
    //     probability: 0.5,
    //   },
    //   {
    //     id: '2',
    //     userID: '1',
    //     nameRisk: 'sec risk',
    //     description: 'its a holiday',
    //     impactTime: 11,
    //     probability: 0.7,
    //   },
    //   ];
    this.riskService.manageRisks.subscribe(el => this.manageRisk = el);
  }


  onSelect(risk: Risk) {
    this.selectedRisk = risk;
    this.riskService.setSelectedRisk(risk);
  }

  AddRisk() {

  }
}
