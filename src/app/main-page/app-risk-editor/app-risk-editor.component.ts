import {Component, OnInit} from '@angular/core';
import {Risk} from '../../shared/interfaces';
import {RiskService} from '../../shared/services/risk.service';

@Component({
  selector: 'app-risk-editor',
  templateUrl: './app-risk-editor.component.html',
  styleUrls: ['./app-risk-editor.component.scss']
})
export class AppRiskEditorComponent implements OnInit {

  // unchangedRisk: Risk;

  public currentRisk: Risk;
  public changedRisk: Risk = null;

  manageRisk = false;


  impactTime: number;
  probability: number;


  constructor(private riskService: RiskService) {

  }

  ngOnInit(): void {

    this.riskService.getSelectedRisk().subscribe((el: Risk) => {
      this.changedRisk = JSON.parse(JSON.stringify(el));
      this.currentRisk = el;
    });
    this.riskService.manageRisks.subscribe(el => this.manageRisk = el);
  }


  onReset() {
    this.riskService.setSelectedRisk(this.currentRisk);
  }

  onApply() {
    this.riskService.updateSelectedRisk(this.changedRisk).subscribe(
      (data: Risk) => {
        this.riskService.getRisks();
        },
      error => console.log(error)
    );
  }

  onRemove() {

  }
}
